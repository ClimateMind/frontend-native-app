import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabsNavigationParams } from 'src/navigation/UserAAuthorizedTabsNavigation';

import useApiClient from 'src/hooks/useApiClient';
import { GetPersonalValues } from 'src/api/responses';
import { useAppSelector } from 'src/store/hooks';
import { CmTypography, RadarChart, Screen, Content, Section, PersonalValueCard } from '@shared/components';
import { useFocusEffect } from '@react-navigation/native';

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
  });

  // While we are fetching the personal values from the backend, show a loading spinner to the user
  if (personalValues === undefined) {
    return <ActivityIndicator size='large' color='black' style={{ marginTop: 100 }} />
  }

  return (
    <Screen ref={scrollRef}>
      <Section>
        <Content>
          <CmTypography variant='h1'>This is your Climate Personality</CmTypography>

          <View style={styles.cardContainer}>
            <PersonalValueCard nr={1} value={personalValues.personalValues[0]} />
            <PersonalValueCard nr={2} value={personalValues.personalValues[1]} />
            <PersonalValueCard nr={3} value={personalValues.personalValues[2]} />
          </View>
        </Content>
      </Section>

      <Section style={styles.whiteArea}>
        <Content>
          <CmTypography variant='h1'>Your Personal Value Web</CmTypography>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <RadarChart
              // The -40 comes from the padding of the parent view (20 on each side)
              size={Dimensions.get('window').width - 40}
              maxWidth={640}
              data={personalValues.valueScores.map(value => value.score)}
              labels={personalValues.valueScores.map(value => value.personalValue)}
            />
          </View>
        </Content>
      </Section>

      <Section style={{ minHeight: 250 }}>
        <Content>
          <CmTypography variant='caption' style={styles.text}>Not happy with your results?</CmTypography>
          <Pressable onPress={retakeQuiz}>
            <CmTypography variant='button' style={styles.text}>RETAKE QUIZ</CmTypography>
          </Pressable>
        </Content>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  whiteArea: {
    backgroundColor: 'white',
    flex: 1,
  },
  padding: {
    padding: 20,
  },
  text: {
    textAlign: 'center',
    marginVertical: 15,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20,
    paddingVertical: 20,
  },
});

export default PersonalValuesScreen;
