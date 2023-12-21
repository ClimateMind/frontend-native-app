import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { QuestionnaireFinishedEvent, analyticsService } from 'src/services';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { setQuizId } from 'src/store/authSlice';
import useApiClient from 'src/hooks/useApiClient';
import { RootDrawerNavigationParams } from 'src/navigation/NavigationRoot';

function useFinishQuiz() {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerNavigationParams, "QuizScreen", undefined>>();
  const apiClient = useApiClient();

  const quizAnswers = useAppSelector((state) => state.quiz.quizAnswers);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  async function submitAnswers(questionSetNumber: number) {
    setIsLoading(true);

    const result = await apiClient.postScores(quizAnswers);
    dispatch(setQuizId(result.quizId));

    setIsLoading(false);

    analyticsService.postEvent(QuestionnaireFinishedEvent, questionSetNumber.toString());

    if (questionSetNumber === 1) {
      navigation.navigate('SubmitSetOneScreen')
    } else if (questionSetNumber === 2) {
      navigation.navigate('SubmitSetTwoScreen');
    }
  }

  return { isLoading, submitAnswers };
}

export default useFinishQuiz;
