import { Image, ScrollView, StyleSheet, View } from 'react-native';
import Colors from '../../../assets/colors';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from '../../../navigation/UserAUnauthorizedStackNavigation';

import SimpleWhiteTextButton from '../../../components/SimpleWhiteTextButton';
import Headline3 from '../../../components/TextStyles/Headline3';
import BodyText from '../../../components/TextStyles/BodyText';

type Props = NativeStackScreenProps<StackParams, 'PreQuizScreen'>;

function PreQuizScreen({ navigation }: Props) {
  function navigateToQuizScreen() {
    navigation.navigate('PersonalValuesScreenNewUser');
    navigation.getParent()?.navigate('QuizScreen', { questionSet: 1 });
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: Colors.themeBright }]}>

        <Headline3 style={styles.titleText}>First, what do you care about?</Headline3>

        <BodyText style={styles.text}>
          Take this short quiz about personal values so we can help you find common
          ground and topics for your conversations.
        </BodyText>
        
        <BodyText style={styles.text}>
          Read each statement and decide how much like it you are or not. Don't worry!
          There's no right or wrong answers!
        </BodyText>

        <SimpleWhiteTextButton style={styles.button} text='TAKE THE QUIZ' onPress={navigateToQuizScreen} />

      </View>
      <View style={[styles.container, { backgroundColor: Colors.themeDark }]}>
        <BodyText style={styles.whiteText}>
          Personal values are key for effective climate conversations.
        </BodyText>
        
        <Image source={require('../../../assets/cm-logo-mint.png')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
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
