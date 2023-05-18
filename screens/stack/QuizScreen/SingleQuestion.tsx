import { StyleSheet, ScrollView, Text, View } from 'react-native';

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
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Q{currentQuestionIndex}</Text>
        <Text style={{ fontWeight: 'bold' }}>/{maxQuestionIndex}</Text>
      </View>

      <ProgressBar progress={currentQuestionIndex / maxQuestionIndex - 0.1} />

      <Text style={styles.question}>{question}</Text>

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
    height: 100,
    marginVertical: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SingleQuestion;
