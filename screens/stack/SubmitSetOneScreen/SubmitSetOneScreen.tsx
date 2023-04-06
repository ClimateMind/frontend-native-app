import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../navigation/RootStackNavigation';

import { Button, Text } from 'react-native';

type Props = NativeStackScreenProps<RootStackParams, 'SubmitSetOneScreen'>;

function SubmitSetOneScreen({ navigation }: Props) {
  function navigateToQuizScreen() {
    navigation.navigate('QuizScreen');
  }

  function navigateToPersonalValuesScreenNewUser() {
    navigation.navigate('PersonalValuesScreenNewUser');
  }
  
  return (
    <>
      <Text>Here you can submit your results after finishing the first 10 questions</Text>
      <Button title='Continue Quiz' onPress={navigateToQuizScreen} />
      <Button title='Finish Quiz' onPress={navigateToPersonalValuesScreenNewUser} />
    </>
  );
}

export default SubmitSetOneScreen;
