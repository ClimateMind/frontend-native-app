import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../../assets/colors';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../navigation/RootStackNavigation';

import SimpleWhiteButton from '../../../components/SimpleWhiteButton';

type Props = NativeStackScreenProps<RootStackParams, 'PreQuizScreen'>;

function PreQuizScreen({ navigation }: Props) {
  function navigateToQuizScreen() {
    navigation.navigate('PersonalValuesScreenNewUser');
    navigation.getParent()?.navigate('QuizScreen', { questionSet: 1 });
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: Colors.themeBright }]}>

        <Text style={styles.titleText}>First, what do you care about?</Text>

        <Text style={styles.text}>
          Take this short quiz about personal values so we can help you find common
          ground and topics for your conversations.
        </Text>
        
        <Text style={styles.text}>
          Read each statement and decide how much like it you are or not. Don't worry!
          There's no right or wrong answers!
        </Text>

        <SimpleWhiteButton style={styles.button} text='TAKE THE QUIZ' onPress={navigateToQuizScreen} />

      </View>
      <View style={[styles.container, { backgroundColor: Colors.themeDark }]}>
        <Text style={styles.whiteText}>
          Personal values are key for effective climate conversations.
        </Text>
        
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    marginBottom: 20,
  },
  whiteText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginTop: 30,
    minWidth: 160,
  },
});

export default PreQuizScreen;
