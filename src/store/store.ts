import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import quizReducer from '@features/quiz/state/quizSlice';
import onboardingReducer from '@features/onboarding/state/onboardingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
    onboarding: onboardingReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
