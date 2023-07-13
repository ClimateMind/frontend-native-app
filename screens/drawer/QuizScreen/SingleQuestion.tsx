import { StyleSheet, ScrollView, View } from 'react-native';

import Headline3 from '../../../components/TextStyles/Headline3';
import Headline4 from '../../../components/TextStyles/Headline4';
import LabelText from '../../../components/TextStyles/LabelText';
import ProgressBar from './ProgressBar';
import Answer from './Answer';

interface SingleQuestionProps {
  currentQuestionIndex: number;
  maxQuestionIndex: number;
  question: string;
  onSelect: (index: number) => void;
}

function SingleQuestion({
  currentQuestionIndex,
  maxQuestionIndex,
  question,
  onSelect,
}: SingleQuestionProps) {
  return (
    <ScrollView style={styles.rootContainer}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 5,
        }}
      >
        <Headline3 style={{ fontSize: 24, fontWeight: 'bold' }}>Q{currentQuestionIndex.toString()}</Headline3>
        <Headline4>/{maxQuestionIndex.toString()}</Headline4>
      </View>

      <ProgressBar progress={currentQuestionIndex / maxQuestionIndex - 0.1} />

      <LabelText style={styles.question}>{question}</LabelText>

      <Answer onSelect={onSelect} index={1} text="Not Like Me At All" />
      <Answer onSelect={onSelect} index={2} text="Not Like me" />
      <Answer onSelect={onSelect} index={3} text="Little Like Me" />
      <Answer onSelect={onSelect} index={4} text="Somewhat Like Me" />
      <Answer onSelect={onSelect} index={5} text="Like Me" />
      <Answer onSelect={onSelect} index={6} text="Very Much Like Me" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    margin: 20,
  },
  question: {
    minHeight: 120,
    marginVertical: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SingleQuestion;
