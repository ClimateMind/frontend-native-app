import AsyncStorage from '@react-native-async-storage/async-storage';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type User = {
  accessToken: string;
  firstName: string;
  lastName: string
  email: string;
  userId: string;
  quizId: string;
}

interface AuthState {
  isLoggedIn: boolean;  
  user: User;
  sessionId: string;  
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: {
    accessToken: '',
    firstName: '',
    lastName: '',
    email: '',
    userId: '',
    quizId: '',
  },
  sessionId: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;

      state.user.accessToken = action.payload.accessToken;
      state.user.firstName = action.payload.firstName;
      state.user.lastName = action.payload.lastName;
      state.user.email = action.payload.email;
      state.user.userId = action.payload.userId;
      state.user.quizId = action.payload.quizId;

      AsyncStorage.setItem('accessToken', action.payload.accessToken);
      AsyncStorage.setItem('firstName', action.payload.firstName);
      AsyncStorage.setItem('lastName', action.payload.lastName);
      AsyncStorage.setItem('email', action.payload.email);
      AsyncStorage.setItem('userId', action.payload.userId);
      AsyncStorage.setItem('quizId', action.payload.quizId);
    },
    logout: (state) => {
      state.isLoggedIn = false;

      state.user.accessToken = '';
      state.user.firstName = '';
      state.user.lastName = '';
      state.user.email = '';
      state.user.userId = '';
      state.user.quizId = '';

      AsyncStorage.removeItem('accessToken');
      AsyncStorage.removeItem('firstName');
      AsyncStorage.removeItem('lastName');
      AsyncStorage.removeItem('email');
      AsyncStorage.removeItem('userId');
      AsyncStorage.removeItem('quizId');
    },
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
      AsyncStorage.setItem('sessionId', action.payload);
    },
    setQuizId: (state, action: PayloadAction<string>) => {
      state.user.quizId = action.payload;
    },
    setAuthToken: (state, action: PayloadAction<string>) => {
      state.user.accessToken = action.payload;
    },
    clearAll: () => {
      AsyncStorage.removeItem('accessToken');
      AsyncStorage.removeItem('firstName');
      AsyncStorage.removeItem('lastName');
      AsyncStorage.removeItem('email');
      AsyncStorage.removeItem('userId');
      AsyncStorage.removeItem('quizId');
      AsyncStorage.removeItem('sessionId');
    },
  },
});

export const {
  login, logout,
  setSessionId, setQuizId, setAuthToken,
  clearAll,
} = authSlice.actions;
export default authSlice.reducer;
