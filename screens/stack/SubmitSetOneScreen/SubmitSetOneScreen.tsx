import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../navigation/RootStackNavigation';

import { Pressable, Text, View } from 'react-native';
import { useEffect } from 'react';
import PageTitle from '../../../components/PageTitle';
import { StyleSheet } from 'react-native';
import SimpleWhiteButton from '../../../components/SimpleWhiteButton';
import Colors from '../../../assets/colors';

type Props = NativeStackScreenProps<RootStackParams, 'SubmitSetOneScreen'>;

function SubmitSetOneScreen({ navigation }: Props) {
  function navigateToQuizScreen() {
    navigation.navigate('QuizScreen', { questionSet: 2 });
  }

  function navigateToPersonalValuesScreenNewUser() {
    navigation.navigate('PersonalValuesScreenNewUser');
  }
  
  return (
    <View style={styles.container}>
      <PageTitle>Woah! You are doing great!</PageTitle>
      
      <Text style={styles.boldText}>Do you want to carry on with another 10 questions or get your results now?</Text>
      
      <Pressable onPress={navigateToPersonalValuesScreenNewUser}>
        <Text style={styles.boldText}>FIND OUT MY CLIMATE PERSONALITY</Text>
      </Pressable>

      <Text style={styles.boldText}>You will get better personalised results if you complete all 20 questions.</Text>
      
      <SimpleWhiteButton text='Continue' onPress={navigateToQuizScreen} />
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

export default SubmitSetOneScreen;
