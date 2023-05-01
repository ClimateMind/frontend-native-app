import axios from 'axios';
import { API_URL } from '@env';

import { useAppSelector } from '../store/hooks';
import * as requests from '../api/requests';
import * as responses from '../api/responses';
import ClimateEffect from '../types/ClimateEffect';
import Solution from '../types/Solution';
import Myth from '../types/Myth';

console.log(API_URL)

function useApiClient() {
  const sessionId = useAppSelector((state) => state.auth.sessionId);
  const quizId = useAppSelector((state) => state.auth.user.quizId);
  const user = useAppSelector((state) => state.auth.user);

  const climateApi = axios.create({
    baseURL: API_URL,
    headers: {
      common: {
        Authorization: 'Bearer undefined',
        'Content-Type': 'application/json',
      },
    },
  });

  async function postSession() {
    try {
      const response = await axios.post<responses.PostSession>(API_URL + '/session');
      return response.data;
    } catch (error) {
      console.log(error);
      return { sessionId: '' };
    }
  }

  async function getQuestions() {
    try {
      const response = await climateApi.get<responses.GetQuestions>('/questions');

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function postScores(quizAnswers: requests.PostScores) {
    if (!sessionId) {
      throw new Error('Missing sessionId')
    }
    
    try {
      const response = await axios.post<responses.PostScores>(
        API_URL + '/scores',
        { questionResponses: quizAnswers },
        {
          headers: {
            'X-Session-Id': sessionId,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return { quizId: '' };
    }
  }

  async function getPersonalValues(quizId: string) {
    if (!sessionId) {
      throw new Error('Missing sessionId')
    }
    
    try {
      const response = await axios.get<responses.GetPersonalValues>(
        API_URL + '/personal_values?quizId=' + quizId,
        {
          headers: {
            'X-Session-Id': sessionId,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function postRegister({ firstName, lastName, email, password, quizId }: requests.PostRegister) {
    try {
      const response = await axios.post<responses.PostRegister>(
        API_URL + '/register',
        { firstName, lastName, email, password, quizId },
      );
      console.log('Register')
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function postLogin(email: string, password: string, recaptchaToken: string) {
    try {
      const response = await axios.post<responses.Login>(
        API_URL + '/login',
        { email, password, recaptchaToken },
      )

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function postPasswordResetLink(email: string) {
    try {
      await axios.post(API_URL + '/password-reset', { email });
    } catch (error) {
      console.log(error);
    }
  }

  async function getClimateFeed(): Promise<ClimateEffect[]> {
    if (!sessionId) {
      throw new Error('Missing sessionId')
    }
    
    const response = await axios.get<{ climateEffects: ClimateEffect[] }>(
      API_URL + '/feed?quizId=' + quizId,
      {
        headers: {
          'X-Session-Id': sessionId,
        },
      }
    );
    
    return response.data.climateEffects;
  }

  async function getSolutionsFeed(): Promise<Solution[]> {
    if (!sessionId) {
      throw new Error('Missing sessionId')
    }
    
    const response = await axios.get<{ solutions: Solution[] }>(
      API_URL + '/solutions?quizId=' + quizId,
      {
        headers: {
          'X-Session-Id': sessionId,
        },
      }
    );

    return response.data.solutions;
  }

  async function getMythsFeed(): Promise<Myth[]> {
    if (!sessionId) {
      throw new Error('Missing sessionId')
    }
    
    const response = await axios.get<{ myths: Myth[] }>(
      API_URL + '/myths',
      {
        headers: {
          'X-Session-Id': sessionId,
        },
      }
    );

    return response.data.myths;
  }

  async function getMyth(mythIri: string) {
    if (!sessionId) {
      throw new Error('Missing sessionId')
    }
    
    const response = await axios.get<{ myth: Myth }>(
      API_URL + '/myths/' + mythIri,
      {
        headers: {
          'X-Session-Id': sessionId,
        },
      }
    );

    return response.data.myth;
  }

  async function putPassword(currentPassword: string, newPassword: string, confirmNewPassword: string) {
    await axios.put(
      API_URL + '/user-account', {
        currentPassword, newPassword, confirmNewPassword,
      },
      {
        headers: {
          'X-Session-Id': sessionId,
          'Authorization': 'Bearer ' + user.accessToken,
        },
      },
    )
  }
  
  async function putEmail(newEmail: string, confirmEmail: string, password: string) {
    await axios.put(
      API_URL + '/email', {
        newEmail, confirmEmail, password,
      },
      {
        headers: {
          'X-Session-Id': sessionId,
          'Authorization': 'Bearer ' + user.accessToken,
        },
      },
    )
  }

  async function createConversationInvite(invitedUserName: string) {
    const response = await axios.post<responses.CreateConversation>(
      API_URL + '/conversation',
      { invitedUserName },
      {
        headers: {
          'X-Session-Id': sessionId,
          'Authorization': 'Bearer ' + user.accessToken,
        },
      },
    );

    return response.data;
  }
  
  async function getAllConversations() {
    const response = await axios.get<{ conversations: responses.GetAllConversations[] }>(
      API_URL + '/conversations',
      {
        headers: {
          'X-Session-Id': sessionId,
          'Authorization': 'Bearer ' + user.accessToken,
        },
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
    postPasswordResetLink,

    getClimateFeed,
    getSolutionsFeed,
    getMythsFeed,
    getMyth,

    putPassword,
    putEmail,

    createConversationInvite,
    getAllConversations,
  };
}

export default useApiClient;
