import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Colors from 'src/assets/colors';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from 'src/navigation/UserAUnauthorizedStackNavigation';

import Screen from 'src/components/Screen/Screen';
import SimpleWhiteTextButton from 'src/components/SimpleWhiteTextButton';
import Headline3 from 'src/components/TextStyles/Headline3';
import BodyText from 'src/components/TextStyles/BodyText';
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
          <Headline3 style={styles.titleText}>First, what do you care about?</Headline3>

          <BodyText style={styles.text}>
            Take this short quiz about personal values so we can help you find common ground and topics for your conversations.
          </BodyText>
          
          <BodyText style={styles.text}>
            Read each statement and decide how much like it you are or not. Don't worry! There's no right or wrong answers!
          </BodyText>

          <SimpleWhiteTextButton style={styles.button} text='TAKE THE QUIZ' onPress={navigateToQuizScreen} />
        </Content>
      </Section>

      <Section style={{ backgroundColor: Colors.themeDark }}>
        <Content>
          <BodyText style={styles.whiteText}>
            Personal values are key for effective climate conversations.
          </BodyText>
          
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
