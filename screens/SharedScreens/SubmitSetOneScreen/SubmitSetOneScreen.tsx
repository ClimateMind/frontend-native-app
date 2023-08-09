import { Pressable, StyleSheet, View } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootDrawerNavigationParams } from '../../../navigation/NavigationRoot';

import Colors from '../../../assets/colors';
import { useAppSelector } from '../../../store/hooks';

import SimpleWhiteTextButton from '../../../components/SimpleWhiteTextButton';
import Headline1 from '../../../components/TextStyles/Headline1';
import BodyText from '../../../components/TextStyles/BodyText';
import ButtonText from '../../../components/TextStyles/ButtonText';

type Props = DrawerScreenProps<RootDrawerNavigationParams, 'SubmitSetOneScreen'>;

function SubmitSetOneScreen({ navigation }: Props) {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  
  function navigateToQuizScreen() {
    navigation.navigate('QuizScreen', { questionSet: 2 });
  }

  function navigateToPersonalValuesScreen() {
    if (isLoggedIn) {
      navigation.navigate('AuthorizedUserAScreens', { screen: 'PersonalValuesScreen' });
    } else {
      navigation.navigate('UnauthorizedUserAScreens');
    }
  }
  
  return (
    <View style={styles.container}>
      <Headline1 style={{ padding: 8 }}>Woah! You are doing great!</Headline1>
      
      <BodyText style={styles.bodyText}>Do you want to carry on with another 10 questions or get your results now?</BodyText>
      
      <Pressable onPress={navigateToPersonalValuesScreen}>
        <ButtonText style={{ padding: 8, textAlign: 'center' }}>FIND OUT MY CLIMATE PERSONALITY</ButtonText>
      </Pressable>

      <BodyText style={styles.bodyText}>You will get better personalised results if you complete all 20 questions.</BodyText>
      
      <SimpleWhiteTextButton style={styles.button} text='Continue' onPress={navigateToQuizScreen} />
    </View>
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
