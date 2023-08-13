import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import useApiClient from "../../../hooks/useApiClient";
import Headline2 from "../../../components/TextStyles/Headline2";
import BodyText from "../../../components/TextStyles/BodyText";

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
      <Headline2 style={styles.title}>Yay! Go you!</Headline2>

      <BodyText>How Did it go?</BodyText>

      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, { backgroundColor: rating === 1 ? 'lightgray' : 'white'}]} onPress={() => submitRating(1)}><BodyText>😡</BodyText></Pressable>
        <Pressable style={[styles.button, { backgroundColor: rating === 2 ? 'lightgray' : 'white'}]} onPress={() => submitRating(2)}><BodyText>😐</BodyText></Pressable>
        <Pressable style={[styles.button, { backgroundColor: rating === 3 ? 'lightgray' : 'white'}]} onPress={() => submitRating(3)}><BodyText>🤔</BodyText></Pressable>
        <Pressable style={[styles.button, { backgroundColor: rating === 4 ? 'lightgray' : 'white'}]} onPress={() => submitRating(4)}><BodyText>😊</BodyText></Pressable>
        <Pressable style={[styles.button, { backgroundColor: rating === 5 ? 'lightgray' : 'white'}]} onPress={() => submitRating(5)}><BodyText>🥳</BodyText></Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 20,
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
