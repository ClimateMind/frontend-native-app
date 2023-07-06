import axios from 'axios';
import { API_URL } from '@env';
import jwtDecode from 'jwt-decode';
import Toast from 'react-native-root-toast';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import * as requests from '../api/requests';
import * as responses from '../api/responses';
import ClimateEffect from '../types/ClimateEffect';
import Solution from '../types/Solution';
import Myth from '../types/Myth';

import { logout } from '../store/authSlice';

const validateToken = (token: string): boolean => {
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds

    const currentTimestamp = Date.now();
    return currentTimestamp < expirationTime; // Return true if the token is not expired
  } catch (error) {
    console.error('Error decoding or validating token:', error);
    return false; // Return false if there's an error in decoding or validating the token
  }
};

function useApiClient() {
  const sessionId = useAppSelector((state) => state.auth.sessionId);
  const quizId = useAppSelector((state) => state.auth.user.quizId);
  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  async function apiCall<T>(method: string, endpoint: string, headers: { [key: string]: string }, data?: any) {
    if (headers['Authorization']) {
      const token = headers['Authorization'].split(' ')[1];
      if (!validateToken(token)) {
        Toast.show('Session expired, please login again.', {
          duration: Toast.durations.LONG,
          backgroundColor: '#ED7878',
          textColor: '#000000',
          opacity: 1,
        });
        dispatch(logout());
      }
    }
    
    const response = await axios.request<T>({
      url: API_URL + endpoint,
      method,
      headers,
      data,
    });
  
    return response;
  }

  async function postSession() {
    try {
      const response = await apiCall<responses.PostSession>('post', '/session', {});
      return response.data;
    } catch (error) {
      console.log(error);
      return { sessionId: '' };
    }
  }

  async function getQuestions() {
    const response = await apiCall<responses.GetQuestions>('get', '/questions', {});
    return response.data;
  }

  async function postScores(quizAnswers: requests.PostScores) {    
    if (!sessionId) {
      throw new Error('Missing sessionId')
    }
    
    const response = await apiCall<responses.PostScores>(
      'post',
      '/scores',
      {
        'X-Session-Id': sessionId,
      },
      { questionResponses: quizAnswers }
    );

    return response.data;
  }

  async function getPersonalValues(quizId: string) {
    if (!sessionId) {
      throw new Error('Missing sessionId')
    }

    if (quizId === '') {
      throw new Error('Missing quizId')
    }
    
    const response = await apiCall<responses.GetPersonalValues>(
      'get',
      '/personal_values?quizId=' + quizId,
      {
        'X-Session-Id': sessionId,
      },
    );

    return response.data;
  }

  async function postRegister({ firstName, lastName, email, password, quizId }: requests.PostRegister) {
    const response = await apiCall<responses.PostRegister>(
      'post',
      '/register',
      {},
      { firstName, lastName, email, password, quizId },
    );

    return response.data;
  }

  async function postLogin(email: string, password: string, recaptchaToken: string) {
    const response = await apiCall<responses.Login>(
      'post',
      '/login',
      {},
      { email, password, recaptchaToken },
    );

    return response.data;
  }

  async function postRefresh() {
    const response = await apiCall<{ access_token: string }>(
      'post',
      '/refresh',
      {
        'X-Session-Id': sessionId,
        'Authorization': 'Bearer ' + user.accessToken,
      },
    );

    console.log(response.data)
    return response.data;
  }

  async function postPasswordResetLink(email: string) {
    await apiCall(
      'post',
      '/password-reset',
      {
        'X-Session-Id': sessionId,
      },
      { email },
    );
  }

  async function getClimateFeed(): Promise<ClimateEffect[]> {
    if (!sessionId) {
      throw new Error('Missing sessionId')
    }
    
    if (quizId === '') {
      throw new Error('Missing quizId')
    }

    const response = await apiCall<{ climateEffects: ClimateEffect[] }>(
      'get',
      '/feed?quizId=' + quizId,
      {
        'X-Session-Id': sessionId,
      },
    );

    return response.data.climateEffects;
  }

  async function getSolutionsFeed(): Promise<Solution[]> {
    if (!sessionId) {
      throw new Error('Missing sessionId')
    }

    if (quizId === '') {
      throw new Error('Missing quizId')
    }

    const response = await apiCall<{ solutions: Solution[] }>(
      'get',
      '/solutions?quizId=' + quizId,
      {
        'X-Session-Id': sessionId,
      },
    );

    return response.data.solutions;
  }

  async function getMythsFeed(): Promise<Myth[]> {
    if (!sessionId) {
      throw new Error('Missing sessionId')
    }
    
    const response = await apiCall<{ myths: Myth[] }>(
      'get',
      '/myths',
      {
        'X-Session-Id': sessionId,
      },
    );

    return response.data.myths;
  }

  async function getMyth(mythIri: string) {
    if (!sessionId) {
      throw new Error('Missing sessionId')
    }
    
    const response = await apiCall<{ myth: Myth }>(
      'get',
      '/myths/' + mythIri,
      {
        'X-Session-Id': sessionId,
      },
    );

    return response.data.myth;
  }

  async function putPassword(currentPassword: string, newPassword: string, confirmPassword: string) {
    await apiCall(
      'put',
      '/user-account',
      {
        'X-Session-Id': sessionId,
        'Authorization': 'Bearer ' + user.accessToken,
      },
      { currentPassword, newPassword, confirmPassword },
    );
  }
  
  async function putEmail(newEmail: string, confirmEmail: string, password: string) {
    await apiCall(
      'put',
      '/email',
      {
        'X-Session-Id': sessionId,
        'Authorization': 'Bearer ' + user.accessToken,
      },
      { newEmail, confirmEmail, password },
    );
  }

  async function createConversationInvite(invitedUserName: string) {
    const response = await apiCall<responses.CreateConversation>(
      'post',
      '/conversation',
      {
        'X-Session-Id': sessionId,
        'Authorization': 'Bearer ' + user.accessToken,
      },
      { invitedUserName },
    );

    return response.data;
  }
  
  async function getAllConversations() {
    const response = await apiCall<{ conversations: responses.GetAllConversations[] }>(
      'get',
      '/conversations',
      {
        'X-Session-Id': sessionId,
        'Authorization': 'Bearer ' + user.accessToken,
      },
    );
    
    return response.data;
  }

  async function deleteConversation(conversationId: string) {
    await apiCall(
      'delete',
      '/conversation/' + conversationId,
      {
        'X-Session-Id': sessionId,
        'Authorization': 'Bearer ' + user.accessToken,
      },
    );    
  }

  async function putSingleConversation(data: requests.PutSingleConversation) {
    try {
      await apiCall(
        'put',
        '/conversation/' + data.conversationId,
        {
          'X-Session-Id': sessionId,
          'Authorization': 'Bearer ' + user.accessToken,
        },
        data.updatedConversation,
      );
    } catch {}
  }

  async function getAlignmentScores(alignmentScoresId: string): Promise<responses.GetAlignmentScores> {
    if (!sessionId) {
      throw new Error('Missing sessionId')
    }

    if (!alignmentScoresId) {
      throw new Error('Missing alignmentScoresId')
    }
    
    const response = await apiCall<responses.GetAlignmentScores>(
      'get',
      '/alignment/' + alignmentScoresId,
      {
        'X-Session-Id': sessionId,
      },
    );

    return response.data;
  }
  
  async function getSelectedTopics(conversationId: string): Promise<responses.GetSelectedTopics> {
    if (!sessionId) {
      throw new Error('Missing sessionId')
    }

    if (!conversationId) {
      throw new Error('Missing conversationId')
    }

    const response = await apiCall<responses.GetSelectedTopics>(
      'get',
      '/conversation/' + conversationId + '/topics',
      {
        'X-Session-Id': sessionId,
      },
    );

    return response.data;
  }      
  
  async function getSharedImpactDetails(impactId: string): Promise<responses.GetSharedImpactDetails> {
    if (!sessionId) {
      throw new Error('Missing sessionId')
    }

    if (!impactId) {
      throw new Error('Missing impactId')
    }

    const response = await apiCall<responses.GetSharedImpactDetails>(
      'get',
      '/alignment/shared-impact/' + impactId,
      {
        'X-Session-Id': sessionId,
      },
    );

    return response.data;
  }
  
  async function getSharedSolutionDetails(solutionId: string): Promise<responses.GetSharedSolutionDetails> {
    if (!sessionId) {
      throw new Error('Missing sessionId')
    }

    if (!solutionId) {
      throw new Error('Missing solutionId')
    }

    const response = await apiCall<responses.GetSharedSolutionDetails>(
      'get',
      '/alignment/shared-solution/' + solutionId,
      {
        'X-Session-Id': sessionId,
      },
    );

    return response.data;
  }
  
  return {
    postSession,
    getQuestions,
    postScores,
    getPersonalValues,
    postRegister,
    postLogin,
    postRefresh,
    postPasswordResetLink,

    getClimateFeed,
    getSolutionsFeed,
    getMythsFeed,
    getMyth,

    putPassword,
    putEmail,

    createConversationInvite,
    getAllConversations,
    deleteConversation,    
    putSingleConversation,

    getAlignmentScores,
    getSelectedTopics,
    getSharedImpactDetails,
    getSharedSolutionDetails,
  };
}

export default useApiClient;
