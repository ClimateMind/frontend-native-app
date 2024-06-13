import { Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { GetStartedButtonEvent, LoginButtonEvent, analyticsService } from 'src/services';
import { Screen, Content } from '@shared/components';
import { StackParams } from 'src/navigation/UserAUnauthorizedStackNavigation';
import { OnboardingButton } from 'src/features/onboarding';

type Props = NativeStackScreenProps<StackParams, 'StartScreen'>;

function StartScreen({ navigation }: Props) {
  function navigateToOnboardingScreen() {
    analyticsService.postEvent(GetStartedButtonEvent);
    navigation.navigate('PreOnboardingScreen');
  }

  function navigateToLoginScreen() {
    analyticsService.postEvent(LoginButtonEvent);
    navigation.navigate('LoginScreen');
  }

  return (
    <Screen style={{ backgroundColor: 'white' }}>
      <Content>
        <Image style={styles.logo} source={require('src/assets/cm-logo.png')} />
        <Image style={styles.slogan} source={require('src/assets/slogan.png')} />

        <OnboardingButton
          text="Get Started"
          variant='light'
          style={{ marginTop: 86, maxWidth: 240 }}
          onPress={navigateToOnboardingScreen}
        />

        <OnboardingButton
          text="Log In"
          variant='dark'
          style={{ marginTop: 19, maxWidth: 240 }}
          onPress={navigateToLoginScreen}
        />
      </Content>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 66,
    aspectRatio: 62 / 66,
    resizeMode: 'contain',
    marginTop: '60%',
  },
  slogan: {
    height: 54,
    aspectRatio: 234 / 54,
    resizeMode: 'contain',
    marginTop: 16,
  },
});

export default StartScreen;
