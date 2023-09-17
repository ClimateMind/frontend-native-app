import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import useApiClient from 'src/hooks/useApiClient';
import { showErrorToast, showSuccessToast } from 'src/components/ToastMessages';
import Headline4 from 'src/components/TextStyles/Headline4';
import Card from 'src/components/Cards/Card';

interface Props {
  show: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

function ChangePasswordModal({ show, onSubmit, onCancel }: Props) {
  const apiClient = useApiClient();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
  function submitDisabled() {
    if (currentPassword === '') {
      return true;
    }
    
    if (!/^(?=.*[0-9!@#$%^&*])(.{8,})$/.test(newPassword)) {
      return true;
    }

    if (!(newPassword === confirmNewPassword)) {
      return true;
    }

    return false;
  }
  
  function submitButtonHandler() {
    apiClient.putPassword(currentPassword, newPassword, confirmNewPassword)
      .then(() => {
        showSuccessToast('Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        onSubmit();
      })
      .catch(error => {
        console.log(error.response.status)
        if (error.response.status === 403) {
          showErrorToast('Current password is incorrect');
        } else {
          showErrorToast(error.response.data.message ?? 'Something went wrong, please try again later');
        }
      });
  }
  
  return (
    <Modal
      visible={show}
      transparent={true}
    >
      <View style={styles.centerModal}>
        <Card style={{ padding: 20, width: '90%' }}>

          <Headline4 style={styles.cardHeader}>Change your password</Headline4>

          <TextInput
            placeholder="Current password"
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={setCurrentPassword}
            style={styles.input}
            placeholderTextColor={'#88999C'}
          />

          <TextInput
            placeholder="New password"
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={setNewPassword}
            style={styles.input}
            placeholderTextColor={'#88999C'}
          />

          <TextInput
            placeholder="Confirm new password"
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={setConfirmNewPassword}
            style={styles.input}
            placeholderTextColor={'#88999C'}
          />

          <View style={styles.buttonContainer}>
            <Pressable onPress={onCancel} style={styles.button}><Text>CANCEL</Text></Pressable>
            <Pressable disabled={submitDisabled()} onPress={submitButtonHandler} style={[styles.button, submitDisabled() && {opacity: 0.2}]}><Text>SUBMIT</Text></Pressable>
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
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'white',
    fontWeight: 'bold',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  }
});

export default ChangePasswordModal;
