import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from '../../../navigation/UserAUnauthorizedStackNavigation';

import Colors from '../../../assets/colors';
import useApiClient from '../../../hooks/useApiClient';
import { useAppSelector } from '../../../store/hooks';
import { GetPersonalValues } from '../../../api/responses';
import SimpleWhiteTextButton from '../../../components/SimpleWhiteTextButton';
import PersonalValueCard from '../../../components/Cards/PersonalValueCard';
import RadarChart from '../../../components/RadarChart';
import Headline1 from '../../../components/TextStyles/Headline1';
import BodyText from '../../../components/TextStyles/BodyText';
import CaptionText from '../../../components/TextStyles/CaptionText';
import ButtonText from '../../../components/TextStyles/ButtonText';

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
  });
  
  // While we are fetching the personal values from the backend, show a loading spinner to the user
  if (personalValues === undefined) {
    return <ActivityIndicator size='large' color='black' style={{ marginTop: 100 }} />
  }
  
  return (
    <ScrollView ref={scrollRef}>
      <View style={[styles.section, styles.blueArea]}>
        <Headline1 style={styles.headlines}>This is your Climate Personality</Headline1>

        <View style={{ marginVertical: 20 }}>
          <PersonalValueCard nr={1} value={personalValues.personalValues[0]} />
        </View>
        <View style={{ marginVertical: 20 }}>
          <PersonalValueCard nr={2} value={personalValues.personalValues[1]} />
        </View>
        <View style={{ marginVertical: 20 }}>
          <PersonalValueCard nr={3} value={personalValues.personalValues[2]} />
        </View>
      </View>

      <View style={[styles.section, styles.whiteArea]}>
        <Headline1 style={styles.headlines}>Your Personal Value Web</Headline1>
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
        <Headline1 style={styles.headlines}>Get started</Headline1>
        <BodyText style={styles.boldText}>Explore how climate change impacts you personally and relates to your values</BodyText>
        <BodyText style={styles.boldText}>Discover climate solutions tailored to you</BodyText>
        <BodyText style={styles.boldText}>Communicate the realities of climate change to others</BodyText>
        <BodyText style={[styles.boldText, { marginBottom: 30 }]}>Set up your account and dive into effective conversations about climate change</BodyText>
        
        <SimpleWhiteTextButton style={styles.button} text='DIVE IN' onPress={navigateToSignUpScreen} />

        <CaptionText style={styles.boldText}>Not happy with your results?</CaptionText>
        <Pressable onPress={retakeQuiz}>
          <ButtonText style={{ letterSpacing: 0, marginBottom: 60 }}>RETAKE QUIZ</ButtonText>
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
  headlines: {
    paddingVertical: 8,
    marginVertical: 20,
  },
  boldText: {
    marginVertical: 15,
    textAlign: 'center',
  },
  button: {
    marginTop: 30,
    marginBottom: 40,
    width: 160,
  },
});

export default PersonalValuesScreenNewUser;
