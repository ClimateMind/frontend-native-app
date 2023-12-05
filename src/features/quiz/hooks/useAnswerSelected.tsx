import { GetQuestions } from 'src/api/responses';
import { addQuizAnswer } from '../state/quizSlice';
import { QuestionStartEvent, analyticsService } from 'src/services';
import { SetStateAction } from 'react';

function useAnswerSelected(
  route: any,
  currentQuestionNumber: number,
  setCurrentQuestionNumber: {
    (value: SetStateAction<number>): void;
    (arg0: (current: number) => number): void;
  },
  questionSets: GetQuestions | undefined,
   dispatch: (arg0: any) => void,
) {
  function answerSelected(answerId: number) {
    if (!questionSets) {
      return;
    }

    const currentQuestion = questionSets.SetOne[currentQuestionNumber - 1];

    dispatch(
      addQuizAnswer({
        questionSet: route.params.questionSet,
        questionId: currentQuestion.id,
        answerId,
      })
    );

    analyticsService.postEvent(
      QuestionStartEvent,
      `${currentQuestion.id}:${currentQuestionNumber}`
    );
    setCurrentQuestionNumber((current: number) => current + 1);
  }
  return answerSelected;
}

export default useAnswerSelected;
