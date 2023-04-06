import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';
import { Button, Text } from 'react-native';

type Props = NativeStackScreenProps<RootStackParams, 'QuizScreen'>;

function QuizScreen({ navigation }: Props) {
  function navigateToSubmitSetOneScreen() {
    navigation.navigate('SubmitSetOneScreen');
  }

  function navigateToSubmitSetTwoScreen() {
    navigation.navigate('SubmitSetTwoScreen');
  }

  return (
    <>
      <Text>Here you will do your quiz</Text>
      <Button title='SubmitSetOne' onPress={navigateToSubmitSetOneScreen} />
      <Button title='SubmitSetTwo' onPress={navigateToSubmitSetTwoScreen} />
    </>
  );
}

export default QuizScreen;
