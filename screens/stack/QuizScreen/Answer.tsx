import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

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
              <Text style={styles.answerText}>{text}</Text>
            </>
          ) : (
            <>
              <Entypo
                name="circle"
                size={24}
                color={pressed ? '#39f5ad' : 'black'}
              />
              <Text style={styles.answerText}>{text}</Text>
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
  },
  answerText: {
    fontWeight: 'bold',
    marginLeft: 30,
  },
  questionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Answer;
