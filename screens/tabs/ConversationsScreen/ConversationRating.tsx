import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import useApiClient from "../../../hooks/useApiClient";

interface Props {
  conversationId: string;
  initialRating: number;
}

function ConversationRating({ conversationId, initialRating}: Props) {
  const apiClient = useApiClient();
  const [rating, setRating] = useState(initialRating);
  
  function submitRating(newRating: number) {
    setRating(newRating);
    
    apiClient.putSingleConversation({
      conversationId,
      updatedConversation: {
        userARating: newRating,
      },
    });
  }
  
  return (
    <>
      <Text style={styles.title}>Yay! Go you!</Text>

      <Text style={styles.subtitle}>How Did it go?</Text>

      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, { backgroundColor: rating === 1 ? 'lightgray' : 'white'}]} onPress={() => submitRating(1)}><Text>😡</Text></Pressable>
        <Pressable style={[styles.button, { backgroundColor: rating === 2 ? 'lightgray' : 'white'}]} onPress={() => submitRating(2)}><Text>😐</Text></Pressable>
        <Pressable style={[styles.button, { backgroundColor: rating === 3 ? 'lightgray' : 'white'}]} onPress={() => submitRating(3)}><Text>🤔</Text></Pressable>
        <Pressable style={[styles.button, { backgroundColor: rating === 4 ? 'lightgray' : 'white'}]} onPress={() => submitRating(4)}><Text>😊</Text></Pressable>
        <Pressable style={[styles.button, { backgroundColor: rating === 5 ? 'lightgray' : 'white'}]} onPress={() => submitRating(5)}><Text>🥳</Text></Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  subtitle: {
    letterSpacing: 1,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#A347FF',
    backgroundColor: 'white',
  },
});

export default ConversationRating;
