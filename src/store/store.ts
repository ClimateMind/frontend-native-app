import { configureStore } from '@reduxjs/toolkit';

import sharedReducer from './sharedSlice';
import authReducer from './authSlice';
import quizReducer from '@features/quiz/state/quizSlice';

export const store = configureStore({
  reducer: {
    shared: sharedReducer,
    auth: authReducer,
    quiz: quizReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
