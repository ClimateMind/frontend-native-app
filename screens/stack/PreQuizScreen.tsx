import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';

import { Button, Text } from 'react-native';

type Props = NativeStackScreenProps<RootStackParams, 'PreQuizScreen'>;

function PreQuizScreen({ navigation }: Props) {
  function navigateToQuizScreen() {
    navigation.navigate('QuizScreen');
  }

  return (
    <>
      <Text>This is the screen before you enter the quiz</Text>
      <Button title='Take Quiz' onPress={navigateToQuizScreen} />
    </>
  );
}

export default PreQuizScreen;
