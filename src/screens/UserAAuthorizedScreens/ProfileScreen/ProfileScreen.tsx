import { useState } from 'react';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { logout } from 'src/store/authSlice';

import { CmTypography, CmButton, Screen, Section, Content } from '@shared/components';
import {
  ChangePasswordModal,
  DeleteAccountModal,
  UpdateEmailModal,
} from '@features/profile/components';

function ProfileScreen() {
  const dispatch = useAppDispatch();
  const firstName = useAppSelector((state) => state.auth.user.firstName);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  function deleteAccountHandler() {
    setShowDeleteAccountModal(false);
    dispatch(logout());
  }

  return (
    <Screen>
      <Section>
        <Content style={{ alignItems: 'flex-start' }}>
          <CmTypography variant="h1" style={{ marginTop: 20 }}>{firstName}'s account</CmTypography>

          <CmButton text="CHANGE PASSWORD" style={{ marginTop: 20, alignSelf: 'stretch' }} onPress={() => setShowPasswordModal(true)} />
          <CmButton text="UPDATE EMAIL" style={{ marginTop: 20, alignSelf: 'stretch' }} onPress={() => setShowEmailModal(true)} />
          <CmButton text="LOGOUT" style={{ marginTop: 20, alignSelf: 'stretch' }} onPress={() => dispatch(logout())} />
          <CmButton text="DELETE ACCOUNT" color="error" style={{ marginTop: 100, alignSelf: 'stretch' }} onPress={() => setShowDeleteAccountModal(true)} />

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

          {showDeleteAccountModal && (
            <DeleteAccountModal
              show={showDeleteAccountModal}
              onCancel={() => setShowDeleteAccountModal(false)}
              onSubmit={deleteAccountHandler}
            />
          )}
        </Content>
      </Section>
    </Screen>
  );
}

export default ProfileScreen;
