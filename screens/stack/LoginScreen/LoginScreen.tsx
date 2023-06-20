import { useRef, useState } from 'react';
import { Dimensions, Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-root-toast';
import { AxiosError } from 'axios';
import Recaptcha, { RecaptchaHandles } from 'react-native-recaptcha-that-works';
import { WEB_URL, RECAPTCHA_SITE_KEY } from '@env';

import { useAppDispatch } from '../../../store/hooks';
import { login } from '../../../store/authSlice';
import useApiClient from '../../../hooks/useApiClient';
import useLogger from '../../../hooks/useLogger';
import PageTitle from '../../../components/PageTitle';

import SimpleWhiteButton from '../../../components/SimpleWhiteButton';
import PasswordResetModal from './PasswordResetModal';
import Colors from '../../../assets/colors';

function LoginScreen() {
  const apiClient = useApiClient();
  const logger = useLogger();
  const dispatch = useAppDispatch();

  const recaptcha = useRef<RecaptchaHandles>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onLogin(token: string) {
    if (email === '' || password === '') {
      Toast.show('Please enter your username and password',
        {
          duration: Toast.durations.LONG,
          backgroundColor: '#ED7878',
          textColor: '#000000',
          opacity: 1,
        }
      );
      
      return;
    }

    try {
      const result = await apiClient.postLogin(email, password, token);

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
        Toast.show(
          error.response?.data.error ?? 'Unexpected Error. Please try again.',
          {
            duration: Toast.durations.LONG,
            backgroundColor: '#ED7878',
            textColor: '#000000',
            opacity: 1,
          }
        );

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
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.container}>
          <Image style={styles.image} source={require("../../../assets/cm-logo.png")} />
          <PageTitle>Climate Mind</PageTitle>

          <Text style={styles.boldText}>Sign In</Text>

          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            autoCorrect={false}
            onChangeText={setEmail}
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={setPassword}
            style={styles.input}
          />

          <View style={{ flexDirection: 'row' }}>
            <Text style={[styles.boldText, { marginRight: 20 }]}>Forgot your password?</Text>
            <Pressable onPress={() => setShowModal(true)}>
              <Text style={[styles.boldText, { textDecorationLine: "underline"}]}>Send reset link</Text>
            </Pressable>
          </View>

          <Recaptcha
            ref={recaptcha}
            siteKey={RECAPTCHA_SITE_KEY}
            baseUrl={WEB_URL}
            onVerify={(token: string) => onLogin(token)}
            onExpire={() => {}}
            size="normal"
            onError={(err) => {
              if (err === null)
                Toast.show('Captcha did not succeed.', {
                  duration: Toast.durations.LONG,
                  backgroundColor: '#ED7878',
                  textColor: '#000000',
                  opacity: 1,
                });
            }}
          />

          <SimpleWhiteButton style={styles.loginButton} text="LOG IN" onPress={() => recaptcha.current?.open()} />

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
  boldText: {
    fontWeight: 'bold',
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
