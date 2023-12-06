import { Image, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { GetStartedButtonEvent, LoginButtonEvent, analyticsService } from 'src/services';
import Colors from 'src/assets/colors';
import { StackParams } from 'src/navigation/UserAUnauthorizedStackNavigation';
import { CmTypography, CmButton, Screen, Section, Content } from '@shared/components';

type Props = NativeStackScreenProps<StackParams, 'StartScreen'>;

function StartScreen({ navigation }: Props) {
  function navigateToLoginScreen() {
    analyticsService.postEvent(LoginButtonEvent);
    navigation.navigate('LoginScreen');
  }

  function navigateToPreQuizScreen() {
    analyticsService.postEvent(GetStartedButtonEvent);
    navigation.navigate('PreQuizScreen');
  }

  return (
    <Screen>
      <Section>
        <Content>
          <Image style={styles.image} source={require('src/assets/cm-logo.png')} />
          <CmTypography variant='h1'>Inspire others to take action!</CmTypography>

          <CmButton style={styles.button} text='GET STARTED' onPress={navigateToPreQuizScreen} />

          <Pressable onPress={navigateToLoginScreen}>
            <CmTypography variant='label' style={styles.text}>Already a member? Login here</CmTypography>
          </Pressable>

          <CmTypography variant='body' style={styles.text}>
            Climate change affects us all. And to inspire sufficient action, we must talk about it
            much more.
          </CmTypography>

          <CmTypography variant='body' style={styles.text}>
            Climate Mind makes it easy to have effective conversations with your friends and family.
          </CmTypography>
        </Content>
      </Section>

      <Section style={{ flexGrow: 1, backgroundColor: Colors.themeDark }}>
        <Content>
          <CmTypography variant="body" style={styles.whiteText}>
            We use proven social science to connect climate change to what
            people care about and help find solutions they like.
          </CmTypography>

          <Pressable delayLongPress={5000} onLongPress={() => navigation.getParent()?.navigate('DevScreen')}>
            <Image source={require('src/assets/ConnectTheDots.png')} />
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
