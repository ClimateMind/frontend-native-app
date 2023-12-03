import { useEffect, useState } from 'react';

import { DrawerScreenProps } from '@react-navigation/drawer';
import { RootDrawerNavigationParams } from '../../../navigation/NavigationRoot';
import { SingleQuestion } from '@features/quiz/components';
import { Screen, Content, Section } from '@shared/components';
import { useQuiz } from 'src/features/quiz/hooks';

type Props = DrawerScreenProps<RootDrawerNavigationParams, 'QuizScreen'>;

function QuizScreen({ route, navigation }: Props) {
  const { questionSets, currentQuestionNumber, answerSelected } = useQuiz(
    route.params.questionSet,
    navigation.navigate('SubmitSetOneScreen'),
    navigation.navigate('SubmitSetTwoScreen')
  );
Ï
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
