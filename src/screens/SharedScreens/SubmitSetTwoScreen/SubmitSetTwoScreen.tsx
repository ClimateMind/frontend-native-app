import { Image, StyleSheet } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootDrawerNavigationParams } from '../../../navigation/NavigationRoot';

import Colors from 'src/assets/colors';
import { useAppSelector } from 'src/store/hooks';

import Screen from 'src/components/Screen/Screen';
import Section from 'src/components/Screen/Section';
import Content from 'src/components/Screen/Content';
import { CmTypography } from '@shared/CmTypography/components';
import SimpleWhiteTextButton from 'src/components/SimpleWhiteTextButton';

type Props = DrawerScreenProps<RootDrawerNavigationParams, 'SubmitSetTwoScreen'>;

function SubmitSetTwoScreen({ navigation }: Props) {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  function navigateToPersonalValuesScreen() {
    if (isLoggedIn) {
      navigation.navigate('UserAAuthorizedScreens', { screen: 'PersonalValuesScreen' });
    } else {
      navigation.navigate('UserAUnauthorizedScreens');
    }
  }

  return (
    <Screen>
      <Section>
        <Content style={{ justifyContent: 'center' }}>
          <CmTypography variant="h1">Woohoo! Good Job!</CmTypography>

          <CmTypography variant="body" style={styles.bodyText}>
            With the questions you just answered I can predict your Climate
            Personality.
          </CmTypography>

          <Image
            style={{ marginVertical: 30 }}
            source={require('src/assets/reward-personalities.png')}
          />

          <CmTypography variant="body" style={styles.bodyText}>
            This is a ranking of the top three personal values that you deploy
            when making decisions.
          </CmTypography>

          <SimpleWhiteTextButton
            style={styles.button}
            text="FIND OUT MY CLIMATE PERSONALITY"
            onPress={navigateToPersonalValuesScreen}
          />
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
    backgroundColor: Colors.themeBright,
  },
  bodyText: {
    textAlign: 'center',
    marginVertical: 30,
  },
  button: {
    marginTop: 30,
    marginBottom: 15,
    minWidth: 160,
  },
});

export default SubmitSetTwoScreen;
