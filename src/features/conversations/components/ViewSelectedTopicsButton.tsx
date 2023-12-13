import { StyleProp, ViewStyle } from 'react-native';
import { CmButton } from '@shared/components';
import useApiClient from 'src/hooks/useApiClient';

interface Props {
  conversationId: string;
  conversationState: number;
  style: StyleProp<ViewStyle>;
  onClick: () => void;
}

function ViewSelectedTopicsButton({ conversationId, conversationState, style, onClick }: Props) {
  const apiClient = useApiClient();

  function handleButtonClick() {
    if (conversationState < 3) {
      apiClient.putSingleConversation({
        conversationId,
        updatedConversation: {
          state: 3,
        },
      });
    }

    onClick();
  }

  return (
    <CmButton
      style={style}
      disabled={conversationState < 2}
      text="VIEW SELECTED TOPICS"
      onPress={handleButtonClick}
    />
  );
}

export default ViewSelectedTopicsButton;
