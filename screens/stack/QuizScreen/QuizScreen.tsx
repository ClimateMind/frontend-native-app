import { ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParams } from '../../../navigation/RootStackNavigation';

import SingleQuestion from './SingleQuestion';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { addQuizAnswer } from '../../../store/quizSlice';
import { GetQuestions } from '../../../api/responses';
import useApiClient from '../../../hooks/useApiClient';

type Props = NativeStackScreenProps<RootStackParams, 'QuizScreen'>;

function QuizScreen({ route, navigation }: Props) {
  const apiClient = useApiClient();
  const dispatch = useAppDispatch();
  
  const [questionSets, setQuestionSets] = useState<GetQuestions>();
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);

  function answerSelected(answerId: number) {   
    if (!questionSets) {
      return;
    }

    const currentQuestion = questionSets.SetOne[currentQuestionNumber - 1]

    dispatch(addQuizAnswer({
      questionSet: route.params.questionSet,
      questionId: currentQuestion.id,
      answerId,
    }));

    setCurrentQuestionNumber(currentQuestionNumber + 1)
  }
  
  useEffect(() => {
    // Fetch the questions on page load
    apiClient.getQuestions().then(result => setQuestionSets(result));
  }, []);
  
  // While we are fetching the questions from the backend, show a loading spinner to the user
  if (questionSets === undefined) {
    return <ActivityIndicator size='large' color='black' style={{ marginTop: 100 }} />
  }

  // If the user answered all 10 questions, he will be navigated to the next screen
  if (route.params.questionSet === 1 && currentQuestionNumber === 11) {
    setCurrentQuestionNumber(1);
    navigation.navigate('SubmitSetOneScreen');
    return null;
  }

  if (route.params.questionSet === 2 && currentQuestionNumber === 11) {
    setCurrentQuestionNumber(1);
    navigation.navigate('SubmitSetTwoScreen');
    return null;
  }

  // Display the next question for the user
  return (
    <>
      <SingleQuestion
        currentQuestionIndex={route.params.questionSet === 1 ? currentQuestionNumber : currentQuestionNumber + 10}
        maxQuestionIndex={route.params.questionSet === 1 ? 10 : 20}
        question={
          route.params.questionSet === 1 ? questionSets.SetOne[currentQuestionNumber - 1].question :
          questionSets.SetTwo[currentQuestionNumber - 1].question
        }
        onSelect={(index) => answerSelected(index)}
      />
    </>
  );
}

export default QuizScreen;
