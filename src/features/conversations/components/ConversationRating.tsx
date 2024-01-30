import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import useApiClient from 'src/hooks/useApiClient';
import { CmTypography, CmEmojiButton } from '@shared/components';

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
      <CmTypography variant="h2" style={styles.title}>
        Yay! Go you!
      </CmTypography>

      <CmTypography variant="body">How Did it go?</CmTypography>

      <View style={styles.buttonContainer}>
        <CmEmojiButton text={'😡'} style={{ backgroundColor: rating === 1 ? 'lightgray' : 'white' }} onPress={() => submitRating(1)} />
        <CmEmojiButton text={'😐'} style={{ backgroundColor: rating === 2 ? 'lightgray' : 'white' }} onPress={() => submitRating(2)} />
        <CmEmojiButton text={'🤔'} style={{ backgroundColor: rating === 3 ? 'lightgray' : 'white' }} onPress={() => submitRating(3)} />
        <CmEmojiButton text={'😊'} style={{ backgroundColor: rating === 4 ? 'lightgray' : 'white' }} onPress={() => submitRating(4)} />
        <CmEmojiButton text={'🥳'} style={{ backgroundColor: rating === 5 ? 'lightgray' : 'white' }} onPress={() => submitRating(5)} />
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
});

export default ConversationRating;
