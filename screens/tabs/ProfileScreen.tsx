import { Button, Text } from 'react-native';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/authSlice';

function ProfileScreen() {
  const dispatch = useAppDispatch();
  
  return (
    <>
      <Text>Here you can manage your profile and logout</Text>
      <Button title='Logout' onPress={() => dispatch(logout())} />
    </>
  );
}

export default ProfileScreen;
