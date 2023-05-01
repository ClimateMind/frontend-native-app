import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../navigation/RootStackNavigation';

import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { resetQuizAnswers } from '../../../store/quizSlice';
import useApiClient from '../../../hooks/useApiClient';
import { setQuizId } from '../../../store/authSlice';
import { GetPersonalValues } from '../../../api/responses';
import PageTitle from '../../../components/PageTitle';
import SimpleWhiteButton from '../../../components/SimpleWhiteButton';
import PersonalValueCard from './PersonalValueCard';

import RadarChart from './RadarChart';
import Colors from '../../../assets/colors';

type Props = NativeStackScreenProps<RootStackParams, 'PersonalValuesScreenNewUser'>;

function PersonalValuesScreenNewUser({ navigation }: Props) {
  const apiClient = useApiClient();
  const dispatch = useAppDispatch();
  const quizAnswers = useAppSelector(state => state.quiz.quizAnswers);

  const [personalValues, setPersonalValues] = useState<GetPersonalValues>();
  
  function retakeQuiz() {
    dispatch(resetQuizAnswers());
    navigation.navigate('QuizScreen', { questionSet: 1 });
  }

  function navigateToSignUpScreen() {
    navigation.navigate('SignUpScreen');
  }
  
  useEffect(() => {
    apiClient.postScores(quizAnswers)
      .then(result => {
        dispatch(setQuizId(result.quizId));
        apiClient.getPersonalValues(result.quizId)
          .then(result => setPersonalValues(result));
      })
  }, [quizAnswers]);
  
  // While we are fetching the personal values from the backend, show a loading spinner to the user
  if (personalValues === undefined) {
    return <ActivityIndicator size='large' color='black' style={{ marginTop: 100 }} />
  }
  
  return (
    <ScrollView>
      <View style={styles.blueArea}>
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

      <View style={styles.orangeArea}>
        <PageTitle>Your Personal Value Web</PageTitle>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <RadarChart
            data={personalValues.valueScores.map(value => value.score)}
            size={300}
            strokeColor="#61dafb"
            strokeWidth={2}
            labelColor="#61dafb"
            axisColor="#ccc"
            axisLabelColor="#666"
            labels={personalValues.valueScores.map(value => value.personalValue)}
          />
        </View>
        
      </View>
      

      <View style={styles.greenArea}>
        <PageTitle>Get started</PageTitle>
        <Text style={[styles.boldText, { marginTop: 30 }]}>Explore how climate change impacts you personally and relates to your values</Text>
        <Text style={styles.boldText}>Discover climate solutions tailored to you</Text>
        <Text style={styles.boldText}>Communicate the realities of climate change to others</Text>
        <Text style={[styles.boldText, { marginBottom: 30 }]}>Set up your account and dive into effective conversations about climate change</Text>
        <View style={{ marginBottom: 40 }}>
          <SimpleWhiteButton text='DIVE IN' onPress={navigateToSignUpScreen} />
        </View>

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
    backgroundColor: Colors.themeBright
    
    ,
    padding: 20,
  },
  orangeArea: {
    backgroundColor: 'white',
    padding: 20,
  },
  greenArea: {
    backgroundColor: Colors.themeBright,
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

export default PersonalValuesScreenNewUser;
