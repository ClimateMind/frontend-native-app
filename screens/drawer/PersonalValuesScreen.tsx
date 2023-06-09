import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';

import Colors from '../../assets/colors';
import useApiClient from '../../hooks/useApiClient';
import { GetPersonalValues } from '../../api/responses';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { resetQuizAnswers } from '../../store/quizSlice';
import PageTitle from '../../components/PageTitle';
import PersonalValueCard from '../stack/PersonalValuesScreenNewUser/PersonalValueCard';
import RadarChart from '../../components/RadarChart';
import { DrawerNavigationParams } from '../../navigation/DrawerNavigation/DrawerNavigation';

type Props = DrawerScreenProps<DrawerNavigationParams, 'PersonalValuesScreen'>;

function PersonalValuesScreen({ navigation }: Props) {
  const apiClient = useApiClient();
  const dispatch = useAppDispatch();
  const quizId = useAppSelector(state => state.auth.user.quizId);
  
  const [personalValues, setPersonalValues] = useState<GetPersonalValues>();
  
  function retakeQuiz() {
    dispatch(resetQuizAnswers());
    navigation.navigate('QuizScreen', { questionSet: 1 });
  }
  
  useEffect(() => {
    apiClient.getPersonalValues(quizId)
      .then(result => setPersonalValues(result));
  }, [quizId]);
  
  // While we are fetching the personal values from the backend, show a loading spinner to the user
  if (personalValues === undefined) {
    return <ActivityIndicator size='large' color='black' style={{ marginTop: 100 }} />
  }
  
  return (
    <ScrollView>
      <View style={[styles.padding, styles.blueArea]}>
        <PageTitle>This is your Climate Personality</PageTitle>

        <View style={styles.valueCard}>
          <PersonalValueCard nr={1} value={personalValues.personalValues[0]} />
        </View>
        <View style={styles.valueCard}>
          <PersonalValueCard nr={2} value={personalValues.personalValues[1]} />
        </View>
        <View style={styles.valueCard}>
          <PersonalValueCard nr={3} value={personalValues.personalValues[2]} />
        </View>
      </View>

      <View style={[styles.padding, styles.whiteArea]}>
        <PageTitle>Your Personal Value Web</PageTitle>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <RadarChart
            size={300}
            data={personalValues.valueScores.map(value => value.score)}
            labels={personalValues.valueScores.map(value => value.personalValue)}
          />
        </View>
      </View>

      <View style={[styles.padding, styles.blueArea]}>
        <Text style={styles.boldText}>Not happy with your results?</Text>
        <Pressable onPress={retakeQuiz}>
          <Text style={styles.boldText}>RETAKE QUIZ</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  blueArea: {
    backgroundColor: Colors.themeBright,
    minHeight: 200,
  },
  whiteArea: {
    backgroundColor: 'white',
  },
  padding: {
    padding: 20,
  },
  boldText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
  },
  valueCard: {
    marginVertical: 20,
  },
});

export default PersonalValuesScreen;
