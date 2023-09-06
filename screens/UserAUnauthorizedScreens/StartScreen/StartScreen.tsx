import { Image, Pressable, StyleSheet } from 'react-native';
import Colors from '../../../assets/colors';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from '../../../navigation/UserAUnauthorizedStackNavigation';
import SimpleWhiteTextButton from '../../../components/SimpleWhiteTextButton';
import BodyText from '../../../components/TextStyles/BodyText';
import LabelText from '../../../components/TextStyles/LabelText';
import Headline1 from '../../../components/TextStyles/Headline1';
import { showSuccessToast } from '../../../components/ToastMessages';
import Screen from '../../../components/Screen/Screen';
import Section from '../../../components/Screen/Section';
import Content from '../../../components/Screen/Content';

type Props = NativeStackScreenProps<StackParams, 'StartScreen'>;

function StartScreen({ navigation }: Props) {
  function navigateToLoginScreen() {
    navigation.navigate('LoginScreen');
  }

  function navigateToPreQuizScreen() {
    navigation.navigate('PreQuizScreen');
  }
  
  return (
    <Screen>
      <Section>
        <Content>
          <Image style={styles.image} source={require('../../../assets/cm-logo.png')} />
          <Headline1 style={{ textAlign: 'center', paddingVertical: 8 }}>Inspire others to take action!</Headline1>

          <SimpleWhiteTextButton style={styles.button} text='GET STARTED' onPress={navigateToPreQuizScreen} />

          <Pressable onPress={navigateToLoginScreen}>
            <LabelText style={[styles.text, { fontWeight: 'bold' }]}>Already a member? Login here</LabelText>
          </Pressable>

          <BodyText style={styles.text}>
            Climate change affects us all. And to inspire sufficient action, we must talk about it
            much more.
          </BodyText>
          
          <BodyText style={styles.text}>
            Climate Mind makes it easy to have effective conversations with your friends and family.
          </BodyText>
        </Content>
      </Section>

      <Section style={{ flexGrow: 1, backgroundColor: Colors.themeDark }}>
        <Content>
          <BodyText style={styles.whiteText}>
            We use proven social science to connect climate change to what people care about and help
            find solutions they like.
          </BodyText>

          <Pressable delayLongPress={2000} onLongPress={() => showSuccessToast("Test12: " + process.env.EXPO_PUBLIC_API_URL)}>
            <Image source={require('../../../assets/ConnectTheDots.png')} />
          </Pressable>
        </Content>
      </Section>
    </Screen>
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
  button: {
    marginTop: 30,
    marginBottom: 15,
    minWidth: 160,
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
