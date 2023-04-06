import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';
import { Button, Text } from 'react-native';

type Props = NativeStackScreenProps<RootStackParams, 'PersonalValuesScreenNewUser'>;

function PersonalValuesScreenNewUser({ navigation }: Props) {
  function navigateToQuizScreen() {
    navigation.navigate('QuizScreen');
  }

  function navigateToSignUpScreen() {
    navigation.navigate('SignUpScreen');
  }
  
  return (
    <>
      <Text>Personal values after finishing the quiz</Text>
      <Button title='Retake Quiz' onPress={navigateToQuizScreen} />
      <Button title='Create new Account' onPress={navigateToSignUpScreen} />
    </>
  );
}

export default PersonalValuesScreenNewUser;
