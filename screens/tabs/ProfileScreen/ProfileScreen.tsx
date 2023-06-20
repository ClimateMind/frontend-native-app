import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { logout } from '../../../store/authSlice';
import PageTitle from '../../../components/PageTitle';
import SimpleWhiteButton from '../../../components/SimpleWhiteButton';
import ChangePasswordModal from './ChangePasswordModal';
import UpdateEmailModal from './UpdateEmailModal';

function ProfileScreen() {
  const dispatch = useAppDispatch();
  const firstName = useAppSelector(state => state.auth.user.firstName);
  
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  
  return (
    <View style={styles.container}>
      <PageTitle>{firstName}'s account</PageTitle>

      <SimpleWhiteButton style={{ marginTop: 20 }} text='CHANGE PASSWORD' onPress={() => setShowPasswordModal(true)} />
      <SimpleWhiteButton style={{ marginTop: 20 }} text='UPDATE EMAIL' onPress={() => setShowEmailModal(true)} />
      <SimpleWhiteButton style={{ marginTop: 20 }} text='LOGOUT' onPress={() => dispatch(logout())} />

      {showPasswordModal && <ChangePasswordModal show={showPasswordModal} onCancel={() => setShowPasswordModal(false)} onSubmit={() => setShowPasswordModal(false)} />}
      {showEmailModal && <UpdateEmailModal show={showEmailModal} onCancel={() => setShowEmailModal(false)} onSubmit={() => setShowEmailModal(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(138, 213, 204, 0.4)',
    padding: 20,
  },
});

export default ProfileScreen;
