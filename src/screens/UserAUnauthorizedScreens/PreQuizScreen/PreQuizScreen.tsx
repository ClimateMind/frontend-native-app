import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Colors from 'src/assets/colors';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from 'src/navigation/UserAUnauthorizedStackNavigation';

import Screen from 'src/components/Screen/Screen';
import SimpleWhiteTextButton from 'src/components/SimpleWhiteTextButton';
import { CmTypography } from '@shared/CmTypography/components';
import Section from 'src/components/Screen/Section';
import Content from 'src/components/Screen/Content';

type Props = NativeStackScreenProps<StackParams, 'PreQuizScreen'>;

function PreQuizScreen({ navigation }: Props) {
  function navigateToQuizScreen() {
    navigation.navigate('PersonalValuesScreenNewUser');
    navigation.getParent()?.navigate('QuizScreen', { questionSet: 1 });
  }

  return (
    <Screen>
      <Section>
        <Content>
          <CmTypography variant='h3' style={styles.titleText}>First, what do you care about?</CmTypography>

          <CmTypography variant='body' style={styles.text}>
            Take this short quiz about personal values so we can help you find common ground and topics for your conversations.
          </CmTypography>

          <CmTypography variant='body' style={styles.text}>
            Read each statement and decide how much like it you are or not. Don't worry! There's no right or wrong answers!
          </CmTypography>

          <SimpleWhiteTextButton style={styles.button} text='TAKE THE QUIZ' onPress={navigateToQuizScreen} />
        </Content>
      </Section>

      <Section style={{ backgroundColor: Colors.themeDark }}>
        <Content>
          <CmTypography variant="body" style={styles.whiteText}>
            Personal values are key for effective climate conversations.
          </CmTypography>

          <Image source={require('src/assets/cm-logo-mint.png')} />
        </Content>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  titleText: {
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    marginBottom: 20,
  },
  whiteText: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 50,
  },
  button: {
    marginTop: 30,
    minWidth: 160,
  },
});

export default PreQuizScreen;
