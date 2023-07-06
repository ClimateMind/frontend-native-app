import { Pressable, StyleSheet, Text, View } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerNavigationParams } from '../../../navigation/DrawerNavigation/DrawerNavigation';

import PageTitle from '../../../components/PageTitle';
import SimpleWhiteButton from '../../../components/SimpleWhiteButton';
import Colors from '../../../assets/colors';
import { useAppSelector } from '../../../store/hooks';

type Props = DrawerScreenProps<DrawerNavigationParams, 'SubmitSetOneScreen'>;

function SubmitSetOneScreen({ navigation }: Props) {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  
  function navigateToQuizScreen() {
    navigation.navigate('QuizScreen', { questionSet: 2 });
  }

  function navigateToPersonalValuesScreen() {
    if (isLoggedIn) {
      navigation.navigate('BottomTabsNavigation', { screen: 'PersonalValuesScreen' });
    } else {
      navigation.navigate('StackNavigation');
    }
  }
  
  return (
    <View style={styles.container}>
      <PageTitle>Woah! You are doing great!</PageTitle>
      
      <Text style={styles.boldText}>Do you want to carry on with another 10 questions or get your results now?</Text>
      
      <Pressable onPress={navigateToPersonalValuesScreen}>
        <Text style={styles.boldText}>FIND OUT MY CLIMATE PERSONALITY</Text>
      </Pressable>

      <Text style={styles.boldText}>You will get better personalised results if you complete all 20 questions.</Text>
      
      <SimpleWhiteButton style={styles.button} text='Continue' onPress={navigateToQuizScreen} />
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
  boldText: {
    fontWeight: 'bold',
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
