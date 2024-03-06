import { useEffect, useState } from 'react';

function useConversationState(conversationStateNumber: number, setShowSeeHowYouAlignModal: (args: boolean) => void, setShowViewSelectedTopicsModal: (args: boolean) => void) {
  const [conversationState, setConversationState] = useState(conversationStateNumber);

  function increaseState(state: number) {
    if (state > conversationState) {
      setConversationState(state);
    }

    if (state === 2) {
      true;
      setShowSeeHowYouAlignModal(true);
    } else if (state === 3) {
      setShowViewSelectedTopicsModal(true);
    }
  }

  useEffect(() => {
    setConversationState(conversationStateNumber);
  }, [conversationStateNumber]);

  return {
    increaseState,
    conversationState,
    setConversationState,
    setShowSeeHowYouAlignModal,
    setShowViewSelectedTopicsModal,
  };
}
export default useConversationState;
