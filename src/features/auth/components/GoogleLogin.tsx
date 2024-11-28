import React, { useState, useEffect } from 'react';
import { Button, Text, StyleSheet } from 'react-native';

import { GOOGLE_IOS_CLIENT_ID, GOOGLE_WEB_CLIENT_ID } from '@env';
import * as AuthSession from 'expo-auth-session';
import { GoogleSignin, GoogleSigninButton, SignInResponse, statusCodes } from '@react-native-google-signin/google-signin';
import { useToastMessages } from '@shared/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import useApiClient from 'src/hooks/useApiClient';
import useLogger from 'src/hooks/useLogger';
import { AxiosError } from 'axios';
import { googleLogin, login } from 'src/store/authSlice';
import { CmButton } from 'src/shared/components';
import { OnboardingButton } from 'src/features/onboarding';
import { SvgXml } from 'react-native-svg';
import * as Svg from 'react-native-svg';
import GoogleSvg from 'src/shared/components/GoogleSvg';
// import { DrawerContentComponentProps } from '@react-navigation/drawer';

interface GoogleLoginProps {
  buttonText: string;
  // navigation: DrawerContentComponentProps;
}

const GoogleLogin = ({ buttonText }: GoogleLoginProps) => {
  const [userInfo, setUserInfo] = useState<SignInResponse | undefined>(undefined);
  const [error, setError] = useState<string>('');
  const quizId = useAppSelector((state) => state.auth.user.quizId);
  const apiClient = useApiClient();
  const logger = useLogger();
  const { showSuccessToast, showErrorToast } = useToastMessages();
  const dispatch = useAppDispatch();

  async function loginGoogleUser(response: any) {
    try {
      if (!response) {
        throw new Error('No credential received from Google');
      }

      const result = await apiClient.postGoogleLogin(response.toString(), quizId);

      if (!result) {
        throw new Error('No response received from the server');
      }

      // showSuccessToast(`Welcome back, ${result.user.first_name}!`);

      if (result.user.quiz_id) {
        dispatch(
          googleLogin({
            accessToken: result.access_token,
            firstName: result.user.first_name,
            lastName: result.user.last_name,
            email: result.user.email,
            userId: result.user.user_uuid,
            quizId: result.user.quiz_id,
          })
        );
        // navigation.closeDrawer(); // need to work out how to close the drawer
        showSuccessToast(`Welcome back, ${result.user.first_name}!`);
        return true;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        showErrorToast(error.response?.data.error ? 'Please select the back button and hit "Get Started" to complete the quiz first' : 'Unexpected Error. Please try again.');

        if (error.response?.status === 400) {
          if (error.response?.data.error) {
            logger.logError('Error while logging in on the LoginScreen.tsx');
          }
        }
      }
    }
  }

  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      iosClientId: GOOGLE_IOS_CLIENT_ID,
    });
  };

  //add it to a useEffect with response as a dependency
  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      loginGoogleUser(userInfo?.data?.idToken);
      setUserInfo(userInfo);
      setError('');
    } catch (error: any) {
      setError(error.message);
      console.log(error.message);
    }
  };
  return (
    <>
      <OnboardingButton text={buttonText} onPress={signIn} style={{ gap: 10, backgroundColor: 'white', minWidth: 200, maxWidth: 240, borderRadius: 100, borderWidth: 1, borderColor: '#07373B', paddingVertical: 10, alignItems: 'center', alignSelf: 'center', width: '100%' }}>
        <GoogleSvg />
      </OnboardingButton>
    </>
  );
};

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
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  GoogleLoginButton: {
    marginTop: '30%',
    paddingHorizontal: 20,
    minWidth: 200,
    maxWidth: 240,
  },
});

export default GoogleLogin;
