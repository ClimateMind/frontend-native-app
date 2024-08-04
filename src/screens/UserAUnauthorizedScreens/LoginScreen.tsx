import { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';

import { useAppDispatch } from 'src/store/hooks';
import { login } from 'src/store/authSlice';
import useApiClient from 'src/hooks/useApiClient';
import useLogger from 'src/hooks/useLogger';

import { PasswordResetModal } from '@features/auth/components';
import { CmTypography, Screen, Content, BackButton } from '@shared/components';
import { useToastMessages } from '@shared/hooks';
import { OnboardingButton } from 'src/features/onboarding';

function LoginScreen() {
  const navigation = useNavigation();

  const apiClient = useApiClient();
  const logger = useLogger();
  const { showSuccessToast, showErrorToast } = useToastMessages();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onLogin() {
    if (email === '' || password === '') {
      showErrorToast('Please enter your username and password');
      return;
    }

    try {
      const result = await apiClient.postLogin(email.trim(), password);

      if (result !== undefined) {
        showSuccessToast(`Welcome back, ${result.user.first_name}!`);
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
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorToast(error.response?.data.error ?? 'Unexpected Error. Please try again.');

        if (error.response?.status === 400) {
          if (error.response?.data.error) {
            logger.logError('Error while logging in on the LoginScreen.tsx');
          }
        }
      }
    }
  }

  // Password Reset Request Modal
  const [showModal, setShowModal] = useState(false);

  return (
    <Screen style={{ backgroundColor: 'white' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'padding'} style={{ width: '100%' }}>
        <Content style={styles.content}>
          <BackButton onPress={() => navigation.goBack()} style={styles.backButton} />

          <Image style={styles.logo} source={require('src/assets/cm-logo.png')} />
          <Image style={styles.slogan} source={require('src/assets/slogan.png')} />

          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCorrect={false}
            onChangeText={setEmail}
            style={[styles.input, { marginTop: 64 }]}
            placeholderTextColor={'#88999C'}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={setPassword}
            style={styles.input}
            placeholderTextColor={'#88999C'}
          />

          <View style={{ justifyContent: 'center' }}>
            <CmTypography variant='body' style={{ marginTop: 32 }}>Forgot your password?</CmTypography>
            <Pressable onPress={() => setShowModal(true)}>
              <CmTypography variant='body' style={styles.sendResetLink}>Send reset link</CmTypography>
            </Pressable>
          </View>

          <OnboardingButton text='Log In' onPress={onLogin} disabled={!email || !password} style={styles.loginButton} />

          <PasswordResetModal show={showModal} onCancel={() => {setShowModal(false)}} onSubmit={() => setShowModal(false)} />
        </Content>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: '10%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 10,
  },
  logo: {
    height: 66,
    aspectRatio: 62 / 66,
    resizeMode: 'contain',
    marginTop: '20%',
  },
  slogan: {
    height: 54,
    aspectRatio: 234 / 54,
    resizeMode: 'contain',
    marginTop: 16,
  },
  input: {
    width: '100%',
    maxWidth: 305,
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'white',
    fontWeight: 'bold',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  sendResetLink: {
    textDecorationLine: "underline",
    fontWeight: 'bold',
    textAlign: 'center'
  },
  loginButton: {
    marginTop: '30%',
    paddingHorizontal: 20,
    minWidth: 200,
    maxWidth: 240,
  },
});

export default LoginScreen;
