import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface QuizState {
  quizAnswers: {
    SetOne: { questionId: number; answerId: number }[];
    SetTwo: { questionId: number; answerId: number }[];
  };
}

const initialState: QuizState = {
  quizAnswers: { SetOne: [], SetTwo: [] },
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    resetQuizAnswers: (state) => {
      state.quizAnswers = { SetOne: [], SetTwo: [] };
    },
    addQuizAnswer: (
      state,
      action: PayloadAction<{ questionSet: 1 | 2; questionId: number; answerId: number }>
    ) => {
      if (action.payload.questionSet === 1) {
        state.quizAnswers.SetOne.push({
          questionId: action.payload.questionId,
          answerId: action.payload.answerId
        });
      } else if (action.payload.questionSet === 2) {
        state.quizAnswers.SetTwo.push({
          questionId: action.payload.questionId,
          answerId: action.payload.answerId
        });
      }
    },
  },
});

export const { resetQuizAnswers, addQuizAnswer } = quizSlice.actions;
export default quizSlice.reducer;
