import { useEffect, useState } from 'react';

function useConversationState(conversationStateNumber: number) {
  const [conversationState, setConversationState] = useState(conversationStateNumber);
  
  const [showSeeHowYouAlignModal, setShowSeeHowYouAlignModal] = useState(false);
  const [showViewSelectedTopicsModal, setShowViewSelectedTopicsModal] = useState(false);

  function increaseState(state: number) {
    if (state > conversationState) {
      setConversationState(state);
    }

    if (state === 2) {
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
    showSeeHowYouAlignModal,
    setShowSeeHowYouAlignModal,
    showViewSelectedTopicsModal,
    setShowViewSelectedTopicsModal,
  };
}
export default useConversationState;
