import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomNavigationParams } from '../../../navigation/BottomNavigation';

import Colors from '../../../assets/colors';
import useApiClient from '../../../hooks/useApiClient';
import { GetPersonalValues } from '../../../api/responses';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import PageTitle from '../../../components/PageTitle';
import PersonalValueCard from '../../stack/PersonalValuesScreenNewUser/PersonalValueCard';
import RadarChart from '../../../components/RadarChart';
import { useFocusEffect } from '@react-navigation/native';

type Props = BottomTabScreenProps<BottomNavigationParams, 'PersonalValuesScreen'>;

function PersonalValuesScreen({ navigation }: Props) {
  const apiClient = useApiClient();
  const dispatch = useAppDispatch();
  const quizId = useAppSelector(state => state.auth.user.quizId);
  
  const scrollRef = useRef<ScrollView | null>(null);
  const [personalValues, setPersonalValues] = useState<GetPersonalValues>();
  
  function retakeQuiz() {
    navigation.getParent()?.navigate('QuizScreen', { questionSet: 1 });
  }

  useEffect(() => {
    if (!quizId) {
      return;
    }
    
    apiClient.getPersonalValues(quizId)
      .then(result => setPersonalValues(result));
  }, [quizId]);

  useFocusEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  })
  
  // While we are fetching the personal values from the backend, show a loading spinner to the user
  if (personalValues === undefined) {
    return <ActivityIndicator size='large' color='black' style={{ marginTop: 100 }} />
  }
  
  return (
    <ScrollView ref={scrollRef}>
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
            // The -40 comes from the padding of the parent view (20 on each side)
            size={Dimensions.get('window').width - 40}
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
