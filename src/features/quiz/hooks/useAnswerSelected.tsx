import { addQuizAnswer } from '../state/quizSlice';
import { QuestionStartEvent, analyticsService } from 'src/services';
import { useAppDispatch } from 'src/store/hooks';

function useAnswerSelected(questionSetNumber: number) {
  const dispatch = useAppDispatch();

  function answerSelected(questionNumber: number, questionId: number, answerId: number) {
    dispatch(
      addQuizAnswer({
        questionSet: questionSetNumber,
        questionId,
        answerId,
      })
    );

    analyticsService.postEvent(QuestionStartEvent, `${questionId}:${questionNumber}`);
  }

  return answerSelected;
}

export default useAnswerSelected;
