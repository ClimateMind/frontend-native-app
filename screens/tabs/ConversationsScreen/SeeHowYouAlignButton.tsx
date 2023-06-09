import { StyleProp, ViewStyle } from "react-native";
import SimpleWhiteButton from "../../../components/SimpleWhiteButton";
import useApiClient from "../../../hooks/useApiClient";

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
    })
    
    onClick();
  }
  
  return (
    <SimpleWhiteButton
      style={style}
      disabled={conversationState < 1}
      text="SEE HOW YOU ALIGN"
      onPress={handleButtonClick}
    />
  );
}

export default SeeHowYouAlignButton;
