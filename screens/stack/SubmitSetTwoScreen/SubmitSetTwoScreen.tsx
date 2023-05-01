import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../navigation/RootStackNavigation';

import { Image, StyleSheet, Text, View } from 'react-native';
import PageTitle from '../../../components/PageTitle';
import SimpleWhiteButton from '../../../components/SimpleWhiteButton';
import Colors from '../../../assets/colors';

type Props = NativeStackScreenProps<RootStackParams, 'SubmitSetTwoScreen'>;

function SubmitSetTwoScreen({ navigation }: Props) {
  function navigateToPersonalValuesScreenNewUser() {
    navigation.navigate('PersonalValuesScreenNewUser');
  }

  return (
    <View style={styles.container}>
      <PageTitle>Woohoo! Good Job!</PageTitle>
      
      <Text style={styles.boldText}>With the questions you just answered I can predict your Climate Personality.</Text>
      
      <Image style={{ marginVertical: 30 }} source={require('../../../assets/reward-personalities.png')} />
      
      <Text style={styles.boldText}>This is a ranking of the top three personal values that you deploy when making decisions.</Text>

      <SimpleWhiteButton text='FIND OUT MY CLIMATE PERSONALITY' onPress={navigateToPersonalValuesScreenNewUser} />
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
});

export default SubmitSetTwoScreen;
