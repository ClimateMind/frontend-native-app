import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../../assets/colors';

import PageTitle from '../../../components/PageTitle';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../navigation/RootStackNavigation';
import SimpleWhiteButton from '../../../components/SimpleWhiteButton';

type Props = NativeStackScreenProps<RootStackParams, 'StartScreen'>;

function StartScreen({ navigation }: Props) {
  function navigateToLoginScreen() {
    navigation.navigate('LoginScreen');
  }

  function navigateToPreQuizScreen() {
    navigation.navigate('PreQuizScreen');
  }
  
  return (
    <ScrollView>
      <View style={[styles.container, { backgroundColor: Colors.themeBright }]}>
        <Image style={styles.image} source={require('../../../assets/cm-logo.png')} />
        <PageTitle>Inspire others to take action!</PageTitle>

        <SimpleWhiteButton text='GET STARTED' onPress={navigateToPreQuizScreen} />

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

      <View style={[styles.container, { backgroundColor: Colors.themeDark }]}>
        <Text style={styles.whiteText}>
          We use proven social science to connect climate change to what people care about and help
          find solutions they like.
        </Text>
        
        <Image source={require('../../../assets/ConnectTheDots.png')} />
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
  image: {
    width: 100,
    resizeMode: 'contain',
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
});

export default StartScreen;
