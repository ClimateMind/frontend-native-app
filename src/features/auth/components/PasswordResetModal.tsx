import { useState } from 'react';
import { Modal, Pressable, StyleSheet, TextInput, View } from 'react-native';

import useApiClient from 'src/hooks/useApiClient';
import { CmTypography, Card } from '@shared/components';
import { useToastMessages } from 'src/shared/hooks';
interface Props {
  show: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

function PasswordResetModal({ show, onSubmit, onCancel }: Props) {
  const apiClient = useApiClient();
  const { showErrorToast, showSuccessToast } = useToastMessages()
  const [email, setEmail] = useState('');

  function onPasswordResetRequest() {
    apiClient.postPasswordResetLink(email.trim())
      .then(() => {
        showSuccessToast('Email sent!');
        setEmail('');
        onSubmit();
      })
      .catch(() => {
        showErrorToast('Something went wrong, please try again later');
      });
  }

  return (
    <Modal visible={show} transparent={true}>
      <View style={styles.centerModal}>
        <Card style={{ padding: 20, width: '90%' }}>

          <CmTypography variant='h3' style={styles.cardHeader}>Reset your password</CmTypography>
          <CmTypography variant='body'>Enter the email associated with your account and we will email you a link to reset your password.</CmTypography>
          <TextInput
            placeholder="Email address"
            keyboardType="email-address"
            autoCorrect={false}
            onChangeText={setEmail}
            style={styles.textInput}
            placeholderTextColor={'#88999C'}
          />

          <View style={styles.buttonContainer}>
            <Pressable onPress={onCancel} style={styles.button}><CmTypography variant='button' style={styles.buttonText}>CANCEL</CmTypography></Pressable>
            <Pressable onPress={onPasswordResetRequest} style={styles.button} disabled={!email.trim()}>
              <CmTypography variant='button' style={[styles.buttonText, { color: !email.trim() ? 'lightgray' : 'black' }]}>SUBMIT</CmTypography>
            </Pressable>
          </View>
        </Card>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cardHeader: {
    textAlign: 'left',
    marginBottom: 10,
  },
  textInput: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginTop: 30,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    padding: 15,
  },
  buttonText: {
    padding: 8,
  },
});

export default PasswordResetModal;
