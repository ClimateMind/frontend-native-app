import { useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from '../../../navigation/StackNavigation';

import { ActivityIndicator, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '../../../store/hooks';
import useApiClient from '../../../hooks/useApiClient';
import { GetPersonalValues } from '../../../api/responses';
import PageTitle from '../../../components/PageTitle';
import SimpleWhiteButton from '../../../components/SimpleWhiteButton';
import PersonalValueCard from '../../../components/PersonalValueCard';

import RadarChart from '../../../components/RadarChart';
import Colors from '../../../assets/colors';

type Props = NativeStackScreenProps<StackParams, 'PersonalValuesScreenNewUser'>;

function PersonalValuesScreenNewUser({ navigation }: Props) {
  const apiClient = useApiClient();
  const quizId = useAppSelector(state => state.auth.user.quizId);

  const scrollRef = useRef<ScrollView | null>(null);
  const [personalValues, setPersonalValues] = useState<GetPersonalValues>();
  
  function retakeQuiz() {
    navigation.getParent()?.navigate('QuizScreen', { questionSet: 1 });
  }

  function navigateToSignUpScreen() {
    navigation.navigate('SignUpScreen');
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
    <ScrollView>
      <View style={[styles.section, styles.blueArea]}>
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

      <View style={[styles.section, styles.whiteArea]}>
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
      
      <View style={[styles.section, styles.blueArea]}>
        <PageTitle>Get started</PageTitle>
        <Text style={[styles.boldText, { marginTop: 30 }]}>Explore how climate change impacts you personally and relates to your values</Text>
        <Text style={styles.boldText}>Discover climate solutions tailored to you</Text>
        <Text style={styles.boldText}>Communicate the realities of climate change to others</Text>
        <Text style={[styles.boldText, { marginBottom: 30 }]}>Set up your account and dive into effective conversations about climate change</Text>
        
        <SimpleWhiteButton style={styles.button} text='DIVE IN' onPress={navigateToSignUpScreen} />

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
  },
  whiteArea: {
    backgroundColor: 'white',
  },
  section: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    marginVertical: 15,
    textAlign: 'center',
  },
  valueCard: {
    marginVertical: 20,
  },
  button: {
    marginTop: 30,
    marginBottom: 40,
    width: 160,
  },
});

export default PersonalValuesScreenNewUser;
