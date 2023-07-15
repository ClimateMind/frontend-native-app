import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { logout } from '../../../store/authSlice';
import PageTitle from '../../../components/PageTitle';
import SimpleWhiteButton from '../../../components/SimpleWhiteButton';
import ChangePasswordModal from './ChangePasswordModal';
import UpdateEmailModal from './UpdateEmailModal';
import Button_Shadow from '../../../shadow-presets/Button_Shadow';

function ProfileScreen() {
  const dispatch = useAppDispatch();
  const firstName = useAppSelector((state) => state.auth.user.firstName);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  return (
    <View style={styles.container}>
      <PageTitle>{firstName}'s account</PageTitle>
      <View style={{ marginTop: 20 }}>
        <Button_Shadow>
          <SimpleWhiteButton
            style={styles.buttons}
            text="CHANGE PASSWORD"
            onPress={() => setShowPasswordModal(true)}
          />
        </Button_Shadow>
      </View>

      <View style={{ marginTop: 20 }}>
        <Button_Shadow>
          <SimpleWhiteButton
            style={styles.buttons}
            text="UPDATE EMAIL"
            onPress={() => setShowEmailModal(true)}
          />
        </Button_Shadow>
      </View>
      <View style={{ marginTop: 20 }}>
        <Button_Shadow>
          <SimpleWhiteButton
            style={styles.buttons}
            text="LOGOUT"
            onPress={() => dispatch(logout())}
          />
        </Button_Shadow>
      </View>
      {showPasswordModal && (
        <ChangePasswordModal
          show={showPasswordModal}
          onCancel={() => setShowPasswordModal(false)}
          onSubmit={() => setShowPasswordModal(false)}
        />
      )}
      {showEmailModal && (
        <UpdateEmailModal
          show={showEmailModal}
          onCancel={() => setShowEmailModal(false)}
          onSubmit={() => setShowEmailModal(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(138, 213, 204, 0.4)',
    padding: 20,
  },
  buttons: {
    borderRadius: 10,
    justifyContent: 'center',
    padding: 15,
    gap: 20,
  },
});

export default ProfileScreen;
