import { Image, StyleSheet, Text, View } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerNavigationParams } from '../../../navigation/DrawerNavigation/DrawerNavigation';

import PageTitle from '../../../components/PageTitle';
import SimpleWhiteButton from '../../../components/SimpleWhiteButton';
import Colors from '../../../assets/colors';
import { useAppSelector } from '../../../store/hooks';

type Props = DrawerScreenProps<DrawerNavigationParams, 'SubmitSetTwoScreen'>;

function SubmitSetTwoScreen({ navigation }: Props) {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  
  function navigateToPersonalValuesScreen() {
    if (isLoggedIn) {
      navigation.navigate('BottomNavigation', { screen: 'PersonalValuesScreen' });
    } else {
      navigation.navigate('RootStackNavigation');
    }
  }

  return (
    <View style={styles.container}>
      <PageTitle>Woohoo! Good Job!</PageTitle>
      
      <Text style={styles.boldText}>With the questions you just answered I can predict your Climate Personality.</Text>
      
      <Image style={{ marginVertical: 30 }} source={require('../../../assets/reward-personalities.png')} />
      
      <Text style={styles.boldText}>This is a ranking of the top three personal values that you deploy when making decisions.</Text>

      <SimpleWhiteButton style={styles.button} text='FIND OUT MY CLIMATE PERSONALITY' onPress={navigateToPersonalValuesScreenNewUser} />
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

export default SubmitSetTwoScreen;
