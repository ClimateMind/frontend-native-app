import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../navigation/RootStackNavigation';

import SimpleWhiteButton from '../../../components/SimpleWhiteButton';
import PageTitle from '../../../components/PageTitle';
import { useState } from 'react';
import useApiClient from '../../../hooks/useApiClient';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { login } from '../../../store/authSlice';
import Colors from '../../../assets/colors';

type Props = NativeStackScreenProps<RootStackParams, 'SignUpScreen'>;

function SignUpScreen({ navigation }: Props) {  
  const apiClient = useApiClient();
  const dispatch = useAppDispatch();
  const quizId = useAppSelector(state => state.auth.user.quizId);
  
  const [inputs, setInputs] = useState({
    firstName: { value: '', isValid: true },
    lastName: { value: '', isValid: true },
    email: { value: '', isValid: true },
    password: { value: '', isValid: true },
    confirmPassword: { value: '', isValid: true },
  });

  function inputChangeHandler(inputIdentifier: string, enteredValue: string) {
    setInputs((current) => {
      return {
        ...current,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const firstNameIsValid = inputs.firstName.value.trim().length > 0;
    const lastNameIsValid = inputs.lastName.value.trim().length > 0;
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email.value);
    const passwordIsValid = /^(?=.*[0-9!@#$%^&*])(.{8,})$/.test(inputs.password.value);
    const confirmPasswordIsValid = inputs.password.value === inputs.confirmPassword.value;

    let formIsValid = true;
    
    if (!firstNameIsValid) {
      setInputs(current => {
        return { ...current, firstName: { value: current.firstName.value, isValid: false } }
      });
      formIsValid = false;
    }

    if (!lastNameIsValid) {
      setInputs(current => {
        return { ...current, lastName: { value: current.lastName.value, isValid: false } }
      });
      formIsValid = false;
    }

    if (!emailIsValid) {
      setInputs(current => {
        return { ...current, email: { value: current.email.value, isValid: false } }
      });
      formIsValid = false;
    }

    if (!passwordIsValid) {
      setInputs(current => {
        return { ...current, password: { value: current.password.value, isValid: false } }
      });
      formIsValid = false;
    }

    if (!confirmPasswordIsValid) {
      setInputs(current => {
        return { ...current, confirmPassword: { value: current.confirmPassword.value, isValid: false } }
      });
      formIsValid = false;
    }
    
    if (!formIsValid) {
      return;
    }
    
    apiClient.postRegister({
      firstName: inputs.firstName.value, lastName: inputs.lastName.value, 
      email: inputs.email.value, password: inputs.password.value, quizId,
    }).then(result => {
      if (result !== undefined) {
        dispatch(login({
          accessToken: result.access_token,
          firstName: result.user.first_name,
          lastName: result.user.last_name,
          email: result.user.email,
          userId: result.user.user_uuid,
          quizId: result.user.quiz_id,
        }));
      }
    })
    .catch(error => console.log(error)); 
  }
  
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
        <PageTitle>Create a Climate Mind account</PageTitle>
        <Text style={{ marginTop: 30, marginBottom: 60, fontWeight: 'bold', textAlign: 'center' }}>
          Save your results, see your climate topics, and start talking.
        </Text>
      </View>

      <TextInput
        placeholder="First Name"
        autoCapitalize="sentences"
        autoCorrect={false}
        onChangeText={(value) => inputChangeHandler('firstName', value)}
        style={[styles.input, !inputs.firstName.isValid && styles.invalidInput]}
      />
      {!inputs.firstName.isValid && <Text style={styles.errorText}>First Name is a required field</Text>}

      <TextInput
        placeholder="Last Name"
        autoCapitalize="sentences"
        autoCorrect={false}
        onChangeText={(value) => inputChangeHandler('lastName', value)}
        style={[styles.input, !inputs.lastName.isValid && styles.invalidInput]}
      />
      {!inputs.lastName.isValid && <Text style={styles.errorText}>Last Name is a required field</Text>}

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCorrect={false}
        onChangeText={(value) => inputChangeHandler('email', value)}
        style={[styles.input, !inputs.email.isValid && styles.invalidInput]}
      />
      {!inputs.email.isValid && <Text style={styles.errorText}>Invalid email address</Text>}

      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        autoCorrect={false}
        onChangeText={(value) => inputChangeHandler('password', value)}
        style={[styles.input, !inputs.password.isValid && styles.invalidInput]}
      />
      {!inputs.password.isValid && <Text style={styles.errorText}>Invalid Password. Password must be at least 8 characters and contain one number or one special character</Text>}

      <TextInput
        placeholder="Confirm Password"
        secureTextEntry={true}
        autoCorrect={false}
        onChangeText={(value) => inputChangeHandler('confirmPassword', value)}
        style={[styles.input, !inputs.confirmPassword.isValid && styles.invalidInput]}
      />
      {!inputs.confirmPassword.isValid && <Text style={styles.errorText}>Passwords must match</Text>}

      <SimpleWhiteButton style={styles.button} text="CREATE ACCOUNT" onPress={submitHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.themeBright,
    justifyContent: 'center'
  },
  input: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'white',
    fontWeight: 'bold',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  invalidInput: {
    borderBottomColor: '#B0063D',
    borderBottomWidth: 2,
  },
  errorText: {
    marginTop: -5,
    marginBottom: 5,
    color: '#B0063D',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15,
  },
});

export default SignUpScreen;
