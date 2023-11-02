import { useState } from 'react';
import { Modal, Pressable, StyleSheet, TextInput, View } from 'react-native';

import useApiClient from 'src/hooks/useApiClient';
import { showErrorToast, showSuccessToast } from 'src/components/ToastMessages';
import { CmTypography } from '@shared/components';
import Card from 'src/components/Cards/Card';
import { AxiosError } from 'axios';

interface Props {
  show: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

function DeleteAccountModal({ show, onSubmit, onCancel }: Props) {
  const apiClient = useApiClient();

  const [confirmPassword, setConfirmPassword] = useState('');

  async function submitButtonHandler() {
    try {
      await apiClient.deleteAccount(confirmPassword);
      showSuccessToast('Account deleted successfully');
      onSubmit();
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorToast(error.response?.data.error ?? 'Unexpected Error. Please try again.');
      }
    }
  }

  return (
    <Modal visible={show} transparent={true}>
      <View style={styles.centerModal}>
        <Card style={{ padding: 20, width: '90%' }}>

          <CmTypography variant='h4' style={styles.cardHeader}>Delete Account</CmTypography>

          <CmTypography variant='body'>Are you sure you want to delete your account? This action will permanently delete your data.</CmTypography>

          <TextInput
            placeholder="Confirm password"
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={setConfirmPassword}
            style={styles.input}
            placeholderTextColor={'#88999C'}
          />

          <View style={styles.buttonContainer}>
            <Pressable onPress={onCancel} style={styles.button}><CmTypography variant='button'>CANCEL</CmTypography></Pressable>
            <Pressable disabled={confirmPassword === ''} onPress={submitButtonHandler} style={[styles.button, confirmPassword === '' && {opacity: 0.2}]}>
              <CmTypography variant='button' style={confirmPassword !== '' && { color: '#ff0000' }}>DELETE ACCOUNT</CmTypography>
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
  input: {
    width: '100%',
    padding: 10,
    backgroundColor: 'white',
    fontWeight: 'bold',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginVertical: 20,
  },
});

export default DeleteAccountModal;
