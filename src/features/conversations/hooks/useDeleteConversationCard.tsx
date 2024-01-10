import { useState } from 'react';
import useApiClient from 'src/hooks/useApiClient';

function useDeleteConversationCard(conversationId: string, onDelete: (conversationId: string) => void) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const apiClient = useApiClient();
  
  function deleteConversation() {
    setShowDeleteModal(false);
    apiClient
      .deleteConversation(conversationId)
      .then(() => onDelete(conversationId))
      .catch((error) => console.log(error));
  }

  return {
    deleteConversation,
    setShowDeleteModal,
    showDeleteModal,
    onDelete,
  };
}

export default useDeleteConversationCard;
