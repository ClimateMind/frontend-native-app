import { StyleProp, ViewStyle } from 'react-native';
import SimpleWhiteTextButton from 'src/components/SimpleWhiteTextButton';
import useApiClient from 'src/hooks/useApiClient';

interface Props {
  conversationId: string;
  conversationState: number;
  style: StyleProp<ViewStyle>;
  onClick: () => void;
}

function YesWeTalkedButton({ conversationId, conversationState, style, onClick }: Props) {
  const apiClient = useApiClient();

  function handleButtonClick() {
    apiClient.putSingleConversation({
      conversationId,
      updatedConversation: {
        state: 4,
      },
    });

    onClick();
  }

  return (
    <SimpleWhiteTextButton
      style={style}
      disabled={conversationState < 3}
      text="YES WE TALKED"
      onPress={handleButtonClick}
    />
  );
}

export default YesWeTalkedButton;
