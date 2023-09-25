import { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootDrawerNavigationParams } from '../../../navigation/NavigationRoot';

import Colors from 'src/assets/colors';
import { useAppSelector } from 'src/store/hooks';

import Screen from 'src/components/Screen/Screen';
import SimpleWhiteTextButton from 'src/components/SimpleWhiteTextButton';
import { CmTypography } from 'src/components';
import Section from 'src/components/Screen/Section';
import Content from 'src/components/Screen/Content';

type Props = DrawerScreenProps<RootDrawerNavigationParams, 'SubmitSetOneScreen'>;

function SubmitSetOneScreen({ navigation }: Props) {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  
  function navigateToQuizScreen() {
    navigation.navigate('QuizScreen', { questionSet: 2 });
  }

  function navigateToPersonalValuesScreen() {
    if (isLoggedIn) {
      navigation.navigate('UserAAuthorizedScreens', { screen: 'PersonalValuesScreen' });
    } else {
      navigation.navigate('UserAUnauthorizedScreens');
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      // Navigate the user back to the start screen
      navigation.navigate('UserAUnauthorizedScreens', { screen: 'StartScreen' });
    }
  }, [isLoggedIn]);

  return (
    <Screen>
      <Section>
        <Content style={{ justifyContent: 'center' }}>
          <CmTypography variant='h1'>Woah! You are doing great!</CmTypography>
          
          <CmTypography variant='body' style={styles.bodyText}>Do you want to carry on with another 10 questions or get your results now?</CmTypography>
          
          <Pressable onPress={navigateToPersonalValuesScreen}>
            <CmTypography variant='button' style={{ textAlign: 'center' }}>FIND OUT MY CLIMATE PERSONALITY</CmTypography>
          </Pressable>

          <CmTypography variant='body' style={styles.bodyText}>You will get better personalised results if you complete all 20 questions.</CmTypography>
          
          <SimpleWhiteTextButton style={styles.button} text='Continue' onPress={navigateToQuizScreen} />
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

export default SubmitSetOneScreen;
