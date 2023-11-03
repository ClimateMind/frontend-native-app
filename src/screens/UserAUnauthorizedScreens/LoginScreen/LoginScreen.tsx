import { useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { AxiosError } from 'axios';
import Recaptcha, { RecaptchaRef } from 'react-native-recaptcha-that-works';

import { useAppDispatch } from 'src/store/hooks';
import { login } from 'src/store/authSlice';
import useApiClient from 'src/hooks/useApiClient';
import useLogger from 'src/hooks/useLogger';

import PasswordResetModal from './PasswordResetModal';
import { showErrorToast } from 'src/components/ToastMessages';
import { CmTypography, CmButton } from '@shared/components';
import Screen from 'src/components/Screen/Screen';
import Section from 'src/components/Screen/Section';
import Content from 'src/components/Screen/Content';

function LoginScreen() {
  const apiClient = useApiClient();
  const logger = useLogger();
  const dispatch = useAppDispatch();

  const recaptcha = useRef<RecaptchaRef>(null);
  const [loginAttempts, setLoginAttempts] = useState(0);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onLogin(token?: string) {
    if (email === '' || password === '') {
      showErrorToast('Please enter your username and password');
      return;
    }

    setLoginAttempts((current) => current + 1);

    try {
      const result = await apiClient.postLogin(email.trim(), password, token);

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
    <Screen>
      <Section>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'padding'}>
          <Content>
            <Image style={styles.image} source={require("src/assets/cm-logo.png")} />
            <CmTypography variant='h2'>Climate Mind</CmTypography>

            <CmTypography variant='body' style={styles.marginVertical}>Sign In</CmTypography>

            <TextInput
              placeholder="Email"
              keyboardType="email-address"
              autoCorrect={false}
              onChangeText={setEmail}
              style={styles.input}
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

            <View style={{ flexDirection: 'row' }}>
              <CmTypography variant='body' style={[styles.marginVertical, { marginRight: 20 }]}>Forgot your password?</CmTypography>
              <Pressable onPress={() => setShowModal(true)} style={{ justifyContent: 'center' }} >
                <CmTypography variant='label' style={[styles.marginVertical, { textDecorationLine: "underline" }]}>Send reset link</CmTypography>
              </Pressable>
            </View>

            {loginAttempts >= 4 && (
              <>
                <Recaptcha
                  ref={recaptcha}
                  siteKey={process.env.EXPO_BUILD_RECAPTCHA_SITE_KEY ?? ''}
                  baseUrl={process.env.EXPO_BUILD_WEB_URL ?? ''}
                  onVerify={(token: string) => onLogin(token)}
                  onExpire={() => {}}
                  size="normal"
                  onError={(err) => {
                    err ?? showErrorToast('Captcha did not load.');
                  }}
                  style={Platform.OS === 'ios' && { marginTop: 100 }}
                />

                <CmButton style={styles.loginButton} text="LOG IN" onPress={() => recaptcha.current?.open()} />
              </>
            )}

            {loginAttempts < 4 && <CmButton style={styles.loginButton} text="LOG IN" onPress={() => onLogin()} />}

            <PasswordResetModal show={showModal} onCancel={() => {setShowModal(false)}} onSubmit={() => setShowModal(false)} />
          </Content>
        </KeyboardAvoidingView>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    resizeMode: 'contain',
  },
  loginButton: {
    marginTop: 30,
    marginBottom: 15,
    minWidth: 160,
  },
  marginVertical: {
    marginVertical: 30,
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
  },
});

export default LoginScreen;
