import { useState } from 'react';
import { Modal, Pressable, StyleSheet, TextInput, View } from "react-native";

import useApiClient from "../../../hooks/useApiClient";
import { showSuccessToast, showErrorToast } from '../../../components/ToastMessages';
import Headline3 from '../../../components/TextStyles/Headline3';
import BodyText from '../../../components/TextStyles/BodyText';
import ButtonText from '../../../components/TextStyles/ButtonText';

interface Props {
  show: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

function PasswordResetModal({ show, onSubmit, onCancel }: Props) {
  const apiClient = useApiClient();
  
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
    <Modal
      visible={show}
      transparent={true}
    >
      <View style={styles.centerModal}>
        <View style={styles.card}>
          <Headline3 style={styles.cardHeader}>Reset your password</Headline3>
          <BodyText>Enter the email associated with your account and we will email you a link to reset your password.</BodyText>
          <TextInput
            placeholder="Email address"
            keyboardType="email-address"
            autoCorrect={false}
            onChangeText={setEmail}
              style={styles.textInput}
          />

          <View style={styles.buttonContainer}>
            <Pressable onPress={onCancel} style={styles.button}><ButtonText style={styles.buttonText}>CANCEL</ButtonText></Pressable>
            <Pressable onPress={onPasswordResetRequest} style={styles.button}><ButtonText style={styles.buttonText}>SUBMIT</ButtonText></Pressable>
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
