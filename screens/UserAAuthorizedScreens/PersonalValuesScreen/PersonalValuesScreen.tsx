import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabsNavigationParams } from '../../../navigation/UserAAuthorizedTabsNavigation';

import Colors from '../../../assets/colors';
import useApiClient from '../../../hooks/useApiClient';
import { GetPersonalValues } from '../../../api/responses';
import { useAppSelector } from '../../../store/hooks';
import PersonalValueCard from '../../../components/Cards/PersonalValueCard';
import RadarChart from '../../../components/RadarChart';
import { useFocusEffect } from '@react-navigation/native';
import Headline2 from '../../../components/TextStyles/Headline2';
import CaptionText from '../../../components/TextStyles/CaptionText';
import ButtonText from '../../../components/TextStyles/ButtonText';

type Props = BottomTabScreenProps<BottomTabsNavigationParams, 'PersonalValuesScreen'>;

function PersonalValuesScreen({ navigation }: Props) {
  const apiClient = useApiClient();
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
        <Headline2 style={{ padding: 8 }}>This is your Climate Personality</Headline2>

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

      <View style={[styles.padding, styles.whiteArea]}>
        <Headline2 style={{ padding: 8 }}>Your Personal Value Web</Headline2>
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
        <CaptionText style={styles.text}>Not happy with your results?</CaptionText>
        <Pressable onPress={retakeQuiz}>
          <ButtonText style={[styles.text, { padding: 8 }]}>RETAKE QUIZ</ButtonText>
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
  text: {
    textAlign: 'center',
    marginVertical: 15,
  },
});

export default PersonalValuesScreen;