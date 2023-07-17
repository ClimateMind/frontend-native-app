import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useAppSelector } from "../../../store/hooks";
import { useState } from "react";
import useApiClient from "../../../hooks/useApiClient";
import Headline4 from "../../../components/TextStyles/Headline4";
import BodyText from "../../../components/TextStyles/BodyText";

interface Props {
  show: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

function UpdateEmailModal({ show, onSubmit, onCancel }: Props) {
  const apiClient = useApiClient();
  const currentEmail = useAppSelector(state => state.auth.user.email);
  
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function submitDisabled() {
    if (email === '' || password === '') {
      return true;
    }

    if (email !== confirmEmail) {
      return true;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return true;
    }

    return false;
  }
  
  function submitButtonHandler() {
    apiClient.putEmail(email, confirmEmail, password);
    onSubmit();
  }
  
  return (
    <Modal
      visible={show}
      transparent={true}
    >
      <View style={styles.centerModal}>
        <View style={styles.card}>
          <Headline4 style={styles.cardHeader}>Update your email address</Headline4>
          <BodyText>Your current email address: {currentEmail}</BodyText>
        
          <TextInput
            placeholder="New Email"
            keyboardType="email-address"
            autoCorrect={false}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor={'#88999C'}
          />

          <TextInput
            placeholder="Confirm New Email"
            keyboardType="email-address"
            autoCorrect={false}
            onChangeText={setConfirmEmail}
            style={styles.input}
            placeholderTextColor={'#88999C'}
          />

          <TextInput
            placeholder="Enter Password to Change"
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={setPassword}
            style={styles.input}
            placeholderTextColor={'#88999C'}
          />
        
          <View style={styles.buttonContainer}>
            <Pressable onPress={onCancel} style={styles.button}><Text>CANCEL</Text></Pressable>
            <Pressable disabled={submitDisabled()} onPress={submitButtonHandler} style={[styles.button, submitDisabled() && {opacity: 0.2}]}><Text>SUBMIT</Text></Pressable>
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

export default UpdateEmailModal;
