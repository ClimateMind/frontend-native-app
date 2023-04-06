import { Button, Text } from 'react-native';
import { useAppDispatch } from '../../../store/hooks';
import { login } from '../../../store/authSlice';

function LoginScreen() {
  const dispatch = useAppDispatch();
  
  return (
    <>
      <Text>Login to your account</Text>
      <Button title='Login' onPress={() => dispatch(login())} />
    </>
  );
}

export default LoginScreen;
