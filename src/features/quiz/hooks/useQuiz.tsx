import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { addQuizAnswer } from '@features/quiz/state/quizSlice';
import { GetQuestions } from 'src/api/responses';
import useApiClient from 'src/hooks/useApiClient';
import { useEffect, useState } from 'react';
import { setQuizId } from 'src/store/authSlice';
import { ActivityIndicator } from 'react-native';

import {
  QuestionStartEvent,
  QuestionnaireFinishedEvent,
  analyticsService,
} from 'src/services';
function useQuiz(route, setOne, setTwo) {
  const apiClient = useApiClient();
  const [questionSets, setQuestionSets] = useState<GetQuestions>();
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const quizAnswers = useAppSelector((state) => state.quiz.quizAnswers);
  const dispatch = useAppDispatch();

  function answerSelected(answerId: number) {
    if (!questionSets) {
      return;
    }

    const currentQuestion = questionSets.SetOne[currentQuestionNumber - 1];

    dispatch(
      addQuizAnswer({
        questionSet: route,
        questionId: currentQuestion.id,
        answerId,
      })
    );

    analyticsService.postEvent(
      QuestionStartEvent,
      `${currentQuestion.id}:${currentQuestionNumber}`
    );
    setCurrentQuestionNumber((current) => current + 1);
  }
  useEffect(() => {
    // Fetch the questions on page load
    // and reverse them so that the last question is displayed first
    apiClient.getQuestions().then((result) => {
      const SetOne = result.SetOne.reverse();
      const SetTwo = result.SetTwo.reverse();
      setQuestionSets({ SetOne, SetTwo });
    });
  }, []);

  useEffect(() => {
    async function submitAnswers() {
      const result = await apiClient.postScores(quizAnswers);
      dispatch(setQuizId(result.quizId));
    }

    // If the user answered all 10 questions, he will be navigated to the next screen
    if (route === 1 && currentQuestionNumber === 11) {
      setCurrentQuestionNumber(1);
      submitAnswers();

      analyticsService.postEvent(QuestionnaireFinishedEvent, '1');
      setOne.navigate('SubmitSetOneScreen');
    }

    if (route === 2 && currentQuestionNumber === 11) {
      setCurrentQuestionNumber(1);
      submitAnswers();

      analyticsService.postEvent(QuestionnaireFinishedEvent, '2');
      setTwo.navigate('SubmitSetTwoScreen');
    }
  }, [currentQuestionNumber]);

  if (
    (route === 1 && currentQuestionNumber === 11) ||
    (route === 2 && currentQuestionNumber === 11)
  ) {
    return null;
  }

  // While we are fetching the questions from the backend, show a loading spinner to the user
  if (questionSets === undefined) {
    return (
      <ActivityIndicator
        size="large"
        color="black"
        style={{ marginTop: 100 }}
      />
    );
  }

  return {
    questionSets,
    setQuestionSets,
    currentQuestionNumber,
    setCurrentQuestionNumber,
    answerSelected,
  };
}

export default useQuiz;
