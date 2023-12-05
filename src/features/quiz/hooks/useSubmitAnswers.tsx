import { SetStateAction, useEffect } from 'react';
import { QuestionnaireFinishedEvent, analyticsService } from 'src/services';
import { setQuizId } from 'src/store/authSlice';
import useApiClient from 'src/hooks/useApiClient';
import { useAppSelector } from 'src/store/hooks';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerNavigationParams } from 'src/navigation/NavigationRoot';

function useSubmitAnswers(
  dispatch: (arg0: any) => void,
  route: any,
  currentQuestionNumber: number,
  setCurrentQuestionNumber: {
    (value: SetStateAction<number>): void;
    (arg0: number): void;
  },
  navigation: DrawerNavigationProp<
    RootDrawerNavigationParams,
    'QuizScreen',
    undefined
  >
) {
  const quizAnswers = useAppSelector((state) => state.quiz.quizAnswers);

  const apiClient = useApiClient();

  useEffect(() => {
    async function submitAnswers() {
      const result = await apiClient.postScores(quizAnswers);
      dispatch(setQuizId(result.quizId));
    }

    // If the user answered all 10 questions, he will be navigated to the next screen
    if (route.params.questionSet === 1 && currentQuestionNumber === 11) {
      setCurrentQuestionNumber(1);
      submitAnswers();

      analyticsService.postEvent(QuestionnaireFinishedEvent, '1');
      navigation.navigate('SubmitSetOneScreen');
    }

    if (route.params.questionSet === 2 && currentQuestionNumber === 11) {
      setCurrentQuestionNumber(1);
      submitAnswers();

      analyticsService.postEvent(QuestionnaireFinishedEvent, '2');
      navigation.navigate('SubmitSetTwoScreen');
    }
  }, [currentQuestionNumber]);
}

export default useSubmitAnswers;
