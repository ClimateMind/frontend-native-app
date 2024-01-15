import { useState } from 'react';

import useApiClient from 'src/hooks/useApiClient';
import useLogger from 'src/hooks/useLogger';

function useDeleteConversationCard(onDelete: (conversationId: string) => void) {
  const apiClient = useApiClient();
  const { logError } = useLogger();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  function deleteConversation(conversationId: string) {
    setShowDeleteModal(false);
    apiClient
      .deleteConversation(conversationId)
      .then(() => onDelete(conversationId))
      .catch((error) => logError(error));
  }

  return {
    deleteConversation,
    setShowDeleteModal,
    showDeleteModal,
    onDelete,
  };
}

export default useDeleteConversationCard;
