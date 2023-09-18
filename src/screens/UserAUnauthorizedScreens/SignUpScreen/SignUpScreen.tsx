import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, TextInput, View } from 'react-native';
import { AxiosError } from 'axios';

import SimpleWhiteTextButton from 'src/components/SimpleWhiteTextButton';
import useApiClient from 'src/hooks/useApiClient';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { login } from 'src/store/authSlice';
import { CmTypography } from 'src/components';
import Screen from 'src/components/Screen/Screen';
import Section from 'src/components/Screen/Section';
import Content from 'src/components/Screen/Content';
import { showErrorToast } from 'src/components/ToastMessages';

function SignUpScreen() {
  const apiClient = useApiClient();
  const dispatch = useAppDispatch();
  const quizId = useAppSelector((state) => state.auth.user.quizId);

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
      setInputs((current) => {
        return { ...current, firstName: { value: current.firstName.value, isValid: false }};
      });
      formIsValid = false;
    }

    if (!lastNameIsValid) {
      setInputs((current) => {
        return { ...current, lastName: { value: current.lastName.value, isValid: false }};
      });
      formIsValid = false;
    }

    if (!emailIsValid) {
      setInputs((current) => {
        return { ...current, email: { value: current.email.value, isValid: false }};
      });
      formIsValid = false;
    }

    if (!passwordIsValid) {
      setInputs((current) => {
        return { ...current, password: { value: current.password.value, isValid: false }};
      });
      formIsValid = false;
    }

    if (!confirmPasswordIsValid) {
      setInputs((current) => {
        return { ...current, confirmPassword: { value: current.confirmPassword.value, isValid: false }};
      });
      formIsValid = false;
    }

    if (!formIsValid) {
      return;
    }

    apiClient
      .postRegister({
        firstName: inputs.firstName.value, lastName: inputs.lastName.value,
        email: inputs.email.value, password: inputs.password.value, quizId,
      })
      .then((result) => {
        if (result !== undefined) {
          dispatch(
            login({
              accessToken: result.access_token,
              firstName: result.user.first_name,
              lastName: result.user.last_name,
              email: result.user.email,
              userId: result.user.user_uuid,
              quizId: result.user.quiz_id,
            })
          );
        }
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          showErrorToast(error.response?.data.error ?? 'Unknow Error has occoured')
        }
      });
  }

  return (
    <Screen>
      <Section>
        <Content>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'padding'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
          >
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
              <CmTypography variant='h1'>Create a Climate Mind account</CmTypography>
              <CmTypography variant='body' style={{ marginTop: 30, marginBottom: 60, textAlign: 'center' }}>
                Save your results, see your climate topics, and start talking.
              </CmTypography>
            </View>

            <TextInput
              placeholderTextColor="#88999C"
              placeholder="First Name"
              autoCapitalize="sentences"
              autoCorrect={false}
              onChangeText={(value) => inputChangeHandler('firstName', value)}
              style={[styles.input, !inputs.firstName.isValid && styles.invalidInput]}
            />
            {!inputs.firstName.isValid && <CmTypography variant='label' style={styles.errorText}>First Name is a required field</CmTypography>}

            <TextInput
              placeholderTextColor="#88999C"
              placeholder="Last Name"
              autoCapitalize="sentences"
              autoCorrect={false}
              onChangeText={(value) => inputChangeHandler('lastName', value)}
              style={[styles.input, !inputs.lastName.isValid && styles.invalidInput]}
            />
            {!inputs.lastName.isValid && <CmTypography variant='label' style={styles.errorText}>Last Name is a required field</CmTypography>}

            <TextInput
              placeholderTextColor="#88999C"
              placeholder="Email"
              keyboardType="email-address"
              autoCorrect={false}
              onChangeText={(value) => inputChangeHandler('email', value)}
              style={[styles.input, !inputs.email.isValid && styles.invalidInput]}
            />
            {!inputs.email.isValid && <CmTypography variant='label' style={styles.errorText}>Invalid email address</CmTypography>}

            <TextInput
              placeholderTextColor="#88999C"
              placeholder="Password"
              secureTextEntry={true}
              autoCorrect={false}
              onChangeText={(value) => inputChangeHandler('password', value)}
              style={[styles.input, !inputs.password.isValid && styles.invalidInput]}
            />
            {!inputs.password.isValid && <CmTypography variant='label' style={styles.errorText}>Invalid Password. Password must be at least 8 characters and contain one number or one special character</CmTypography>}

            <TextInput
              placeholderTextColor="#88999C"
              placeholder="Confirm Password"
              secureTextEntry={true}
              autoCorrect={false}
              onChangeText={(value) => inputChangeHandler('confirmPassword', value)}
              style={[styles.input, !inputs.confirmPassword.isValid && styles.invalidInput]}
            />
            {!inputs.confirmPassword.isValid && <CmTypography variant='label' style={styles.errorText}>Passwords must match</CmTypography>}

            <SimpleWhiteTextButton style={styles.button} text="CREATE ACCOUNT" onPress={submitHandler} />
          </KeyboardAvoidingView>
        </Content>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
