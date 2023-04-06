import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Colors from '../../../assets/colors';

import PageTitle from '../../../components/PageTitle';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../navigation/RootStackNavigation';

type Props = NativeStackScreenProps<RootStackParams, 'StartScreen'>;

function StartScreen({ navigation }: Props) {
  function navigateToLoginScreen() {
    navigation.navigate('LoginScreen');
  }

  function navigateToPreQuizScreen() {
    navigation.navigate('PreQuizScreen');
  }
  
  return (
    <>
      <View style={[styles.container, { backgroundColor: Colors.startScreenBackgroundBright }]}>
        <PageTitle>Inspire others to take action!</PageTitle>

        <Pressable style={({ pressed }) => [styles.button, pressed ? styles.buttonPressed : null]} onPress={navigateToPreQuizScreen}>
          <Text style={styles.buttonText}>GET STARTED</Text>
        </Pressable>

        <Pressable onPress={navigateToLoginScreen}>
          <Text style={[styles.text, { fontWeight: 'bold' }]}>Already a member? Login here</Text>
        </Pressable>

        <Text style={styles.text}>
          Climate change affects us all. And to inspire sufficient action, we must talk about it
          much more.
        </Text>
        
        <Text style={styles.text}>
          Climate Mind makes it easy to have effective conversations with your friends and family.
        </Text>
      </View>

      <View style={[styles.container, { backgroundColor: Colors.startScreenBackgroundDark }]}>
        <Text style={styles.whiteText}>
          We use proven social science to connect climate change to what people care about and help
          find solutions they like.
        </Text>
        <Image source={require('../../../assets/ConnectTheDots.png')} style={styles.image} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 50,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15,
  },
  buttonPressed: {
    backgroundColor: 'lightgray',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
    marginBottom: 40,
  },
  whiteText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {},
});

export default StartScreen;
