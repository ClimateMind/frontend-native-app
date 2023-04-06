import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';
import { Button, Text } from 'react-native';

type Props = NativeStackScreenProps<RootStackParams, 'SubmitSetTwoScreen'>;

function SubmitSetTwoScreen({ navigation }: Props) {
  function navigateToPersonalValuesScreenNewUser() {
    navigation.navigate('PersonalValuesScreenNewUser');
  }

  return (
    <>
      <Text>Here you can submit your result after finishing all 20 questions</Text>
      <Button title='Finish Quiz' onPress={navigateToPersonalValuesScreenNewUser} />
    </>
  );
}

export default SubmitSetTwoScreen;
