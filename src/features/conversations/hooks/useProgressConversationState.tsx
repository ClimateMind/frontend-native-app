import useApiClient from 'src/hooks/useApiClient';

function useProgressConversationState() {
  const apiClient = useApiClient();

  async function progressConversation(increaseState: () => void, conversationId: string, conversationState: number) {
    let newConversationState;

    if (conversationState < 2) {
      newConversationState = 2;
    } else if (conversationState === 2) {
      newConversationState = 3;
    } else if (conversationState === 3) {
      newConversationState = 4;
    } else {
      newConversationState = 5;
    }

    try {
      await apiClient.putSingleConversation({
        conversationId,
        updatedConversation: {
          state: newConversationState,
        },
      });

      increaseState();
    } catch (error) {
      console.error('Error updating conversation state:', error);
    }
  }
  return { progressConversation };
}

export default useProgressConversationState;
