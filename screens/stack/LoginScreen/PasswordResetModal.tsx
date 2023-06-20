import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import useApiClient from "../../../hooks/useApiClient";
import { showSuccessToast } from '../../../components/ToastMessages';

interface Props {
  show: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

function PasswordResetModal({ show, onSubmit, onCancel }: Props) {
  const apiClient = useApiClient();
  
  const [email, setEmail] = useState('');
  
  function onPasswordResetRequest() {
    apiClient.postPasswordResetLink(email);
    showSuccessToast('Email sent!');
    onSubmit();
  }

  return (
    <Modal
      visible={show}
      transparent={true}
    >
      <View style={styles.centerModal}>
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Reset your password</Text>
          <Text>Enter the email associated with your account and we will email you a link to reset your password.</Text>
          <TextInput
            placeholder="Email address"
            keyboardType="email-address"
            autoCorrect={false}
            onChangeText={setEmail}
              style={styles.textInput}
          />

          <View style={styles.buttonContainer}>
            <Pressable onPress={onCancel} style={styles.button}><Text>CANCEL</Text></Pressable>
            <Pressable onPress={onPasswordResetRequest} style={styles.button}><Text>SUBMIT</Text></Pressable>
          </View>
        </View>
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
  card: {
    padding: 20,
    backgroundColor: 'white',
    width: '90%',
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default PasswordResetModal;
