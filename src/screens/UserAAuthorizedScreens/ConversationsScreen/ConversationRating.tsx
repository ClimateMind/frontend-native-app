import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import useApiClient from 'src/hooks/useApiClient';
import { CmTypography } from '@shared/CmTypography/components';

interface Props {
  conversationId: string;
  initialRating: number;
  onRated: () => void;
}

function ConversationRating({ conversationId, initialRating, onRated }: Props) {
  const apiClient = useApiClient();
  const [rating, setRating] = useState(initialRating);

  function submitRating(newRating: number) {
    setRating(newRating);
    onRated();

    apiClient.putSingleConversation({
      conversationId,
      updatedConversation: {
        userARating: newRating,
      },
    });
  }

  return (
    <>
      <CmTypography variant='h2' style={styles.title}>Yay! Go you!</CmTypography>

      <CmTypography variant="body">How Did it go?</CmTypography>

      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, { backgroundColor: rating === 1 ? 'lightgray' : 'white'}]} onPress={() => submitRating(1)}><CmTypography variant='body'>😡</CmTypography></Pressable>
        <Pressable style={[styles.button, { backgroundColor: rating === 2 ? 'lightgray' : 'white'}]} onPress={() => submitRating(2)}><CmTypography variant='body'>😐</CmTypography></Pressable>
        <Pressable style={[styles.button, { backgroundColor: rating === 3 ? 'lightgray' : 'white'}]} onPress={() => submitRating(3)}><CmTypography variant='body'>🤔</CmTypography></Pressable>
        <Pressable style={[styles.button, { backgroundColor: rating === 4 ? 'lightgray' : 'white'}]} onPress={() => submitRating(4)}><CmTypography variant='body'>😊</CmTypography></Pressable>
        <Pressable style={[styles.button, { backgroundColor: rating === 5 ? 'lightgray' : 'white'}]} onPress={() => submitRating(5)}><CmTypography variant='body'>🥳</CmTypography></Pressable>
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
