import { Image, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Colors from 'src/assets/colors';
import { StackParams } from 'src/navigation/UserAUnauthorizedStackNavigation';
import SimpleWhiteTextButton from 'src/components/SimpleWhiteTextButton';
import { CmTypography } from '@shared/CmTypography/components';
import { showSuccessToast } from 'src/components/ToastMessages';
import Screen from 'src/components/Screen/Screen';
import Section from 'src/components/Screen/Section';
import Content from 'src/components/Screen/Content';

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
          <Image style={styles.image} source={require('src/assets/cm-logo.png')} />
          <CmTypography variant='h1'>Inspire others to take action!</CmTypography>

          <SimpleWhiteTextButton style={styles.button} text='GET STARTED' onPress={navigateToPreQuizScreen} />

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

          <Pressable delayLongPress={2000} onLongPress={() => showSuccessToast("Test15: " + process.env.EXPO_PUBLIC_API_URL)}>
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
