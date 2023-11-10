import React from 'react';
import { ActivityIndicator, Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from 'src/navigation/UserAUnauthorizedStackNavigation';

import Colors from 'src/assets/colors';
import useApiClient from 'src/hooks/useApiClient';
import { useAppSelector } from 'src/store/hooks';
import { GetPersonalValues } from 'src/api/responses';
import { CmButton, CmTypography, RadarChart, Screen, Section, Content, PersonalValueCard } from '@shared/components';

type Props = NativeStackScreenProps<StackParams, 'PersonalValuesScreenNewUser'>;

function PersonalValuesScreenNewUser({ navigation }: Props) {
  const apiClient = useApiClient();
  const quizId = useAppSelector((state) => state.auth.user.quizId);

  const scrollRef = React.useRef<ScrollView | null>(null);
  const [personalValues, setPersonalValues] = React.useState<GetPersonalValues>();

  function retakeQuiz() {
    navigation.getParent()?.navigate('QuizScreen', { questionSet: 1 });
  }

  function navigateToSignUpScreen() {
    navigation.navigate('SignUpScreen');
  }

  React.useEffect(() => {
    if (!quizId) {
      return;
    }

    apiClient.getPersonalValues(quizId).then(result => setPersonalValues(result));
  }, [quizId]);

  useFocusEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  });

  // While we are fetching the personal values from the backend, show a loading spinner to the user
  if (personalValues === undefined) {
    return <ActivityIndicator size='large' color='black' style={{ marginTop: 100 }} />;
  }

  return (
    <Screen ref={scrollRef}>
      <Section>
        <Content>
          <CmTypography variant='h1' style={styles.headlines}>This is your Climate Personality</CmTypography>

          <View style={styles.cardContainer}>
            <PersonalValueCard nr={1} value={personalValues.personalValues[0]} />
            <PersonalValueCard nr={2} value={personalValues.personalValues[1]} />
            <PersonalValueCard nr={3} value={personalValues.personalValues[2]} />
          </View>
        </Content>
      </Section>

      <Section style={styles.whiteArea}>
        <Content>
          <CmTypography variant='h1' style={styles.headlines}>Your Personal Value Web</CmTypography>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <RadarChart
              // The -40 comes from the padding of the parent view (20 on each side)
              size={Dimensions.get('window').width - 40}
              maxWidth={640}
              data={personalValues.valueScores.map((value) => value.score)}
              labels={personalValues.valueScores.map(
                (value) => value.personalValue
              )}
            />
          </View>
        </Content>
      </Section>

      <Section>
        <Content>
          <CmTypography variant='h1' style={styles.headlines}>Get started</CmTypography>
          <CmTypography variant='body' style={styles.boldText}>Explore how climate change impacts you personally and relates to your values</CmTypography>
          <CmTypography variant='body' style={styles.boldText}>Discover climate solutions tailored to you</CmTypography>
          <CmTypography variant='body' style={styles.boldText}>Communicate the realities of climate change to others</CmTypography>
          <CmTypography variant='body' style={[styles.boldText, { marginBottom: 30 }]}>Set up your account and dive into effective conversations about climate change</CmTypography>

          <CmButton style={styles.button} text='DIVE IN' onPress={navigateToSignUpScreen} />

          <CmTypography variant='caption' style={styles.boldText}>Not happy with your results?</CmTypography>
          <Pressable onPress={retakeQuiz}>
            <CmTypography variant='button' style={{ letterSpacing: 0, marginBottom: 60 }}>RETAKE QUIZ</CmTypography>
          </Pressable>
        </Content>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  blueArea: {
    backgroundColor: Colors.themeBright,
  },
  whiteArea: {
    backgroundColor: 'white',
  },
  headlines: {
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
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 20,
    paddingVertical: 20,
  },
});

export default PersonalValuesScreenNewUser;
