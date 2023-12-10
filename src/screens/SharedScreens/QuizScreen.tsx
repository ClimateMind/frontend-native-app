import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';

import { RootDrawerNavigationParams } from '../../navigation/NavigationRoot';
import { Screen, Content, Section } from '@shared/components';
import { SingleQuestion } from '@features/quiz/components';
import { useAnswerSelected, useFinishQuiz, useGetQuestions } from '@features/quiz/hooks';

type Props = DrawerScreenProps<RootDrawerNavigationParams, 'QuizScreen'>;

function QuizScreen({ route }: Props) {
  const questionSetNumber = route.params.questionSet;

  const { questionSets } = useGetQuestions();
  const answerSelected = useAnswerSelected(questionSetNumber);
  const { isLoading, submitAnswers } = useFinishQuiz();

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);

  // If the user answered all 10 questions, we will submit the result, reset the quiz
  // to be prepared for the next quiz take and navigate away
  if (currentQuestionNumber === 11) {
    setCurrentQuestionNumber(1);
    submitAnswers(questionSetNumber);

    return null;
  }

  // While we are fetching the questions from the backend
  // or submitting the results, show a loading spinner to the user
  if (questionSets === undefined || isLoading) {
    return <ActivityIndicator size="large" color="black" style={{ marginTop: 100 }} />;
  }

  // Display the next question for the user
  return (
    <Screen style={{ backgroundColor: 'white' }}>
      <Section>
        <Content>
          <SingleQuestion
            currentQuestionIndex={
              questionSetNumber === 1 ? currentQuestionNumber : currentQuestionNumber + 10
            }
            maxQuestionIndex={questionSetNumber === 1 ? 10 : 20}
            question={
              questionSetNumber === 1
                ? questionSets.SetOne[currentQuestionNumber - 1].question
                : questionSets.SetTwo[currentQuestionNumber - 1].question
            }
            onSelect={(index) => {
              const questionId = questionSetNumber === 1
                ? questionSets.SetOne[currentQuestionNumber - 1].id
                : questionSets.SetTwo[currentQuestionNumber - 1].id;

              answerSelected(currentQuestionNumber, questionId, index);
              setCurrentQuestionNumber((current: number) => current + 1);
            }}
          />
        </Content>
      </Section>
    </Screen>
  );
}

export default QuizScreen;