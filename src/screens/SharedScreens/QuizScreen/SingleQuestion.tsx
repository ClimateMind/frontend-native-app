import { StyleSheet, ScrollView, View } from 'react-native';

import { CmTypography } from '@shared/components';
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
  // When questions have a line break, the second line starts with a space.
  // This is a workaround to remove that space.
  const questionText = question.split('\n').map(item => item.trim()).join('\n');

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
        <CmTypography variant="h3" style={{ fontSize: 24, fontWeight: 'bold', letterSpacing: 0 }}>Q{currentQuestionIndex.toString()}</CmTypography>
        <CmTypography variant="h4">/{maxQuestionIndex.toString()}</CmTypography>
      </View>

      <ProgressBar progress={currentQuestionIndex / maxQuestionIndex - 0.1} />

      <CmTypography variant="label" style={styles.question}>
        {questionText}
      </CmTypography>

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
