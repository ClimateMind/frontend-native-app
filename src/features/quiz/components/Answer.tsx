import { Pressable, StyleSheet, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { CmTypography } from '@shared/components';

interface AnswerProps {
  index: number;
  text: string;
  onSelect: (index: number) => void;
}

function Answer({ index, text, onSelect }: AnswerProps) {
  return (
    <View style={styles.questionsContainer}>
      <Pressable
        onPress={() => onSelect(index)}
        style={[styles.answerContainer]}
      >
        {({ pressed }) =>
          pressed ? (
            <>
              <FontAwesome5 name="dot-circle" size={24} color="#39f5ad" />
              <CmTypography variant="label" style={styles.answerText}>
                {text}
              </CmTypography>
            </>
          ) : (
            <>
              <Entypo
                name="circle"
                size={24}
                color={pressed ? '#39f5ad' : 'black'}
              />
              <CmTypography variant="label" style={styles.answerText}>
                {text}
              </CmTypography>
            </>
          )
        }
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 15,
    width: '100%',
    height: 65,
  },
  answerText: {
    fontWeight: 'bold',
    marginLeft: 30,
    fontSize: 14,
  },
  questionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Answer;
