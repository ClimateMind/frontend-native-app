import { StyleProp, ViewStyle } from 'react-native';
import useApiClient from 'src/hooks/useApiClient';
import { CmButton } from '@shared/components';

interface Props {
  conversationId: string;
  conversationState: number;
  style: StyleProp<ViewStyle>;
  onClick: () => void;
}

function SeeHowYouAlignButton({ conversationId, conversationState, style, onClick }: Props) {
  const apiClient = useApiClient();

  function handleButtonClick() {
    apiClient.putSingleConversation({
      conversationId,
      updatedConversation: {
        state: 2,
      },
    });

    onClick();
  }

  return (
    <CmButton
      style={style}
      disabled={conversationState < 1}
      text="SEE HOW YOU ALIGN"
      onPress={handleButtonClick}
    />
  );
}

export default SeeHowYouAlignButton;
