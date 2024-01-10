import { useState } from 'react';
import useApiClient from 'src/hooks/useApiClient';

function useIconButton(currentUserName: string) {
  const [userName, setUserName] = useState(currentUserName);
  const [isEditable, setIsEditable] = useState(false);
  const apiClient = useApiClient();

  function handleSaveField(conversationId: string) {
    setIsEditable(false);
    if (userName !== currentUserName) {
      apiClient.putSingleConversation({
        conversationId: conversationId,
        updatedConversation: {
          receiverName: userName,
        },
      });
    }
  }

  function handleCancelField() {
    setIsEditable(false);
    setUserName(currentUserName);
  }

  return {
    handleSaveField,
    handleCancelField,
    userName,
    setUserName,
    isEditable,
    setIsEditable,
  };
}

export default useIconButton;
