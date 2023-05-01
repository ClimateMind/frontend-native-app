import { StyleSheet, ScrollView, Text, View, Pressable } from "react-native";
import { Entypo } from '@expo/vector-icons'; 
import ProgressBar from './ProgressBar';

interface AnswerProps {
  index: number,
  text: string,
}

interface SingleQuestionProps {
  currentQuestionIndex: number;
  maxQuestionIndex: number;
  question: string; 
  onSelect: (index: number) => void;
}

function SingleQuestion({ currentQuestionIndex, maxQuestionIndex, question, onSelect }: SingleQuestionProps) {  
  function Answer({ index, text }: AnswerProps) {
    return (
      <Pressable style={({ pressed }) => [styles.answerContainer, pressed ? styles.answerContainerPressed : null]} onPress={() => onSelect(index)}>
        <Entypo name="circle" size={24} color="black" />
        <Text style={styles.answerText}>{text}</Text>
      </Pressable>
    );
  }

  return (
    <ScrollView style={styles.rootContainer}>
      
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 5 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Q{currentQuestionIndex}</Text>
        <Text style={{ fontWeight: 'bold' }}>/{maxQuestionIndex}</Text>
      </View>

      
      <ProgressBar progress={currentQuestionIndex / maxQuestionIndex - 0.1} />
      
      <Text style={styles.question}>{question}</Text>

      <Answer index={1} text='Not Like Me At All' />
      <Answer index={2} text='Not Like me' />
      <Answer index={3} text='Little Like Me' />
      <Answer index={4} text='Somewhat Like Me' />
      <Answer index={5} text='Like Me' />
      <Answer index={6} text='Very Much Like Me' />
      
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
  questionProgressString: {
    textAlign: 'right',
    
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    padding: 15,
  },
  answerContainerPressed: {
    backgroundColor: 'lightgray',
  },
  answerText: {
    fontWeight: 'bold',
    marginLeft: 30,
  },
});

export default SingleQuestion;