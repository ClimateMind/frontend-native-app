import { useState } from 'react';

import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { logout } from 'src/store/authSlice';
import SimpleWhiteTextButton from 'src/components/SimpleWhiteTextButton';
import ChangePasswordModal from './ChangePasswordModal';
import UpdateEmailModal from './UpdateEmailModal';
import { CmTypography, CmButton } from '@shared/components';
import Screen from 'src/components/Screen/Screen';
import Section from 'src/components/Screen/Section';
import Content from 'src/components/Screen/Content';
import DeleteAccountModal from './DeleteAccountModal';

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
          <CmTypography variant='h1' style={{ marginTop: 20 }}>{firstName}'s account</CmTypography>

          <SimpleWhiteTextButton style={{ marginTop: 20, alignSelf: 'stretch' }} text='CHANGE PASSWORD' onPress={() => setShowPasswordModal(true)} />
          <SimpleWhiteTextButton style={{ marginTop: 20, alignSelf: 'stretch' }} text='UPDATE EMAIL' onPress={() => setShowEmailModal(true)} />
          <SimpleWhiteTextButton style={{ marginTop: 20, alignSelf: 'stretch' }} text='LOGOUT' onPress={() => dispatch(logout())} />

          <CmButton text='DELETE ACCOUNT' color='error' style={{ marginTop: 100, alignSelf: 'stretch' }} onPress={() => setShowDeleteAccountModal(true)} />

          {showPasswordModal && <ChangePasswordModal show={showPasswordModal} onCancel={() => setShowPasswordModal(false)} onSubmit={() => setShowPasswordModal(false)} />}
          {showEmailModal && <UpdateEmailModal show={showEmailModal} onCancel={() => setShowEmailModal(false)} onSubmit={() => setShowEmailModal(false)} />}
          {showDeleteAccountModal && <DeleteAccountModal show={showDeleteAccountModal} onCancel={() => setShowDeleteAccountModal(false)} onSubmit={deleteAccountHandler} />}
        </Content>
      </Section>
    </Screen>
  );
}

export default ProfileScreen;
