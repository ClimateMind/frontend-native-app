import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootDrawerNavigationParams } from '../../../navigation/NavigationRoot';
import { SingleQuestion } from '@features/quiz/components';
import { Screen, Content, Section } from '@shared/components';
import { useAppDispatch } from 'src/store/hooks';
import { GetQuestions } from 'src/api/responses';

import {
  useAnswerSelected,
  useGetQuestions,
  useSubmitAnswers,
} from '@features/quiz/hooks';


type Props = DrawerScreenProps<RootDrawerNavigationParams, 'QuizScreen'>;

function QuizScreen({ route, navigation }: Props) {
  const dispatch = useAppDispatch();
  const [questionSets, setQuestionSets] = useState<GetQuestions>();
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);

  const answerSelected = useAnswerSelected(
    route,
    currentQuestionNumber,
    setCurrentQuestionNumber,
    questionSets,
    dispatch
  );

  useGetQuestions(setQuestionSets);

  useSubmitAnswers(
    dispatch,
    route,
    currentQuestionNumber,
    setCurrentQuestionNumber,
    navigation
  );

 // If the user answered all 10 questions, he will be navigated to the next screen and we don't want to show anything
  if (
    (route.params.questionSet === 1 && currentQuestionNumber === 11) ||
    (route.params.questionSet === 2 && currentQuestionNumber === 11)
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

  // Display the next question for the user
  return (
    <Screen style={{ backgroundColor: 'white' }}>
      <Section>
        <Content>
          <SingleQuestion
            currentQuestionIndex={
              route.params.questionSet === 1
                ? currentQuestionNumber
                : currentQuestionNumber + 10
            }
            maxQuestionIndex={route.params.questionSet === 1 ? 10 : 20}
            question={
              route.params.questionSet === 1
                ? questionSets.SetOne[currentQuestionNumber - 1].question
                : questionSets.SetTwo[currentQuestionNumber - 1].question
            }
            onSelect={(index) => answerSelected(index)}
          />
        </Content>
      </Section>
    </Screen>
  );
}

export default QuizScreen;
