import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootDrawerNavigationParams } from '../../../navigation/NavigationRoot';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { addQuizAnswer } from 'src/store/quizSlice';
import { GetQuestions } from 'src/api/responses';
import useApiClient from 'src/hooks/useApiClient';
import { setQuizId } from 'src/store/authSlice';
import { Screen, Content, Section, SingleQuestion } from '@shared/components'

type Props = DrawerScreenProps<RootDrawerNavigationParams, 'QuizScreen'>;

function QuizScreen({ route, navigation }: Props) {
  const apiClient = useApiClient();
  const dispatch = useAppDispatch();

  const quizAnswers = useAppSelector((state) => state.quiz.quizAnswers);
  const [questionSets, setQuestionSets] = useState<GetQuestions>();
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);

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

    setCurrentQuestionNumber(currentQuestionNumber + 1);
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
  if (
    (route.params.questionSet === 1 && currentQuestionNumber === 11) ||
    (route.params.questionSet === 2 && currentQuestionNumber === 11)
  ) {
    return null;
  }

  // While we are fetching the questions from the backend, show a loading spinner to the user
  if (questionSets === undefined) {
    return <ActivityIndicator size='large' color='black' style={{ marginTop: 100 }} />
  }

  // Display the next question for the user
  return (
    <Screen style={{ backgroundColor: 'white' }}>
      <Section>
        <Content>
          <SingleQuestion
            currentQuestionIndex={route.params.questionSet === 1 ? currentQuestionNumber : currentQuestionNumber + 10}
            maxQuestionIndex={route.params.questionSet === 1 ? 10 : 20}
            question={
              route.params.questionSet === 1 ? questionSets.SetOne[currentQuestionNumber - 1].question :
              questionSets.SetTwo[currentQuestionNumber - 1].question
            }
            onSelect={(index) => answerSelected(index)}
          />
        </Content>
      </Section>
    </Screen>
  );
}

export default QuizScreen;
