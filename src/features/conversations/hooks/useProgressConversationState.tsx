import useApiClient from 'src/hooks/useApiClient';

function useProgressConversationState() {
  const apiClient = useApiClient();

  function handleButtonClick(increaseState: () => void, conversationId: string, conversationState: number) {
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

    apiClient.putSingleConversation({
      conversationId,
      updatedConversation: {
        state: newConversationState,
      },
    });
    increaseState();
  }

  return {
    handleButtonClick,
  };
}

export default useProgressConversationState;
