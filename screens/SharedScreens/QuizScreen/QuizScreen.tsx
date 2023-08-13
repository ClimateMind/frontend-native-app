import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootDrawerNavigationParams } from '../../../navigation/NavigationRoot';

import SingleQuestion from './SingleQuestion';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addQuizAnswer } from '../../../store/quizSlice';
import { GetQuestions } from '../../../api/responses';
import useApiClient from '../../../hooks/useApiClient';
import { setQuizId } from '../../../store/authSlice';

type Props = DrawerScreenProps<RootDrawerNavigationParams, 'QuizScreen'>;

function QuizScreen({ route, navigation }: Props) {
  const apiClient = useApiClient();
  const dispatch = useAppDispatch();
  
  const quizAnswers = useAppSelector(state => state.quiz.quizAnswers);
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

  useEffect(() => {
    async function submitAnswers() {
      const result = await apiClient.postScores(quizAnswers);
      dispatch(setQuizId(result.quizId));
    }
    
    // If the user answered all 10 questions, he will be navigated to the next screen
    if (route.params.questionSet === 1 && currentQuestionNumber === 11) {
      setCurrentQuestionNumber(1);
      submitAnswers();
      navigation.navigate('SubmitSetOneScreen');
    }

    if (route.params.questionSet === 2 && currentQuestionNumber === 11) {
      setCurrentQuestionNumber(1);
      submitAnswers();
      navigation.navigate('SubmitSetTwoScreen');
    }
  }, [currentQuestionNumber]);

  // If the user answered all 10 questions, he will be navigated to the next screen and we don't want to show anything
  if ((route.params.questionSet === 1 && currentQuestionNumber === 11) || (route.params.questionSet === 2 && currentQuestionNumber === 11)) {
    return null;
  }
  
  // While we are fetching the questions from the backend, show a loading spinner to the user
  if (questionSets === undefined) {
    return <ActivityIndicator size='large' color='black' style={{ marginTop: 100 }} />
  }

  // Display the next question for the user
  return (
    <View style={styles.screen}>
      <SingleQuestion
        currentQuestionIndex={route.params.questionSet === 1 ? currentQuestionNumber : currentQuestionNumber + 10}
        maxQuestionIndex={route.params.questionSet === 1 ? 10 : 20}
        question={
          route.params.questionSet === 1 ? questionSets.SetOne[currentQuestionNumber - 1].question :
          questionSets.SetTwo[currentQuestionNumber - 1].question
        }
        onSelect={(index) => answerSelected(index)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default QuizScreen;
