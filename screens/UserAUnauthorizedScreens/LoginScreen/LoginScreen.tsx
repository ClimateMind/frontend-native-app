import { useRef, useState } from 'react';
import { Dimensions, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { AxiosError } from 'axios';
import Recaptcha, { RecaptchaHandles } from 'react-native-recaptcha-that-works';
import { WEB_URL, RECAPTCHA_SITE_KEY } from '@env';

import { useAppDispatch } from '../../../store/hooks';
import { login } from '../../../store/authSlice';
import useApiClient from '../../../hooks/useApiClient';
import useLogger from '../../../hooks/useLogger';

import SimpleWhiteTextButton from '../../../components/SimpleWhiteTextButton';
import PasswordResetModal from './PasswordResetModal';
import Colors from '../../../assets/colors';
import { showErrorToast } from '../../../components/ToastMessages';
import Headline2 from '../../../components/TextStyles/Headline2';
import BodyText from '../../../components/TextStyles/BodyText';
import LabelText from '../../../components/TextStyles/LabelText';

function LoginScreen() {
  const apiClient = useApiClient();
  const logger = useLogger();
  const dispatch = useAppDispatch();

  const recaptcha = useRef<RecaptchaHandles>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onLogin(token: string) {
    if (email === '' || password === '') {      
      showErrorToast('Please enter your username and password');
      return;
    }

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
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: Colors.themeBright }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : 'padding'}>
        <View style={styles.container}>
          <Image style={styles.image} source={require("../../../assets/cm-logo.png")} />
          <Headline2>Climate Mind</Headline2>

          <BodyText style={styles.marginVertical}>Sign In</BodyText>

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
            <BodyText style={[styles.marginVertical, { marginRight: 20 }]}>Forgot your password?</BodyText>
            <Pressable onPress={() => setShowModal(true)} style={{ justifyContent: 'center' }} >
              <LabelText style={[styles.marginVertical, { textDecorationLine: "underline" }]}>Send reset link</LabelText>
            </Pressable>
          </View>

          <Recaptcha
            ref={recaptcha}
            siteKey={RECAPTCHA_SITE_KEY}
            baseUrl={WEB_URL}
            onVerify={(token: string) => onLogin(token)}
            onExpire={() => {}}
            size="normal"
            onError={(err) => { err ?? showErrorToast('Captcha did not load.') }}
            style={Platform.OS === 'ios' && {marginTop:100}}
          />

          <SimpleWhiteTextButton style={styles.loginButton} text="LOG IN" onPress={() => recaptcha.current?.open()} />

          <PasswordResetModal show={showModal} onCancel={() => {setShowModal(false)}} onSubmit={() => setShowModal(false)} />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    width: Dimensions.get('screen').width * 0.8,
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
