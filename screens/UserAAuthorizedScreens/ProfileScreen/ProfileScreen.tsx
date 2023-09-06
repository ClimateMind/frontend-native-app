import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { logout } from '../../../store/authSlice';
import SimpleWhiteTextButton from '../../../components/SimpleWhiteTextButton';
import ChangePasswordModal from './ChangePasswordModal';
import UpdateEmailModal from './UpdateEmailModal';
import Headline1 from '../../../components/TextStyles/Headline1';
import Screen from '../../../components/Screen/Screen';
import Section from '../../../components/Screen/Section';
import Content from '../../../components/Screen/Content';

function ProfileScreen() {
  const dispatch = useAppDispatch();
  const firstName = useAppSelector(state => state.auth.user.firstName);
  
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  
  return (
    <Screen>
      <Section>
        <Content style={{ alignItems: 'flex-start' }}>
          <Headline1 style={{ padding: 8, marginTop: 20 }}>{firstName}'s account</Headline1>

          <SimpleWhiteTextButton style={{ marginTop: 20 }} text='CHANGE PASSWORD' onPress={() => setShowPasswordModal(true)} />
          <SimpleWhiteTextButton style={{ marginTop: 20 }} text='UPDATE EMAIL' onPress={() => setShowEmailModal(true)} />
          <SimpleWhiteTextButton style={{ marginTop: 20 }} text='LOGOUT' onPress={() => dispatch(logout())} />

          {showPasswordModal && <ChangePasswordModal show={showPasswordModal} onCancel={() => setShowPasswordModal(false)} onSubmit={() => setShowPasswordModal(false)} />}
          {showEmailModal && <UpdateEmailModal show={showEmailModal} onCancel={() => setShowEmailModal(false)} onSubmit={() => setShowEmailModal(false)} />}
        </Content>
      </Section>
    </Screen>
  );
}

export default ProfileScreen;
