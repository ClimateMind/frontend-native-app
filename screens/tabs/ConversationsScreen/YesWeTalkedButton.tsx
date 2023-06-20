import { StyleProp, ViewStyle } from "react-native";
import SimpleWhiteButton from "../../../components/SimpleWhiteButton";
import useApiClient from "../../../hooks/useApiClient";

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
    })
    
    onClick();
  }
  
  return (
    <SimpleWhiteButton
      style={style}
      disabled={conversationState < 3}
      text="YES WE TALKED"
      onPress={handleButtonClick}
    />
  );
}

export default YesWeTalkedButton;
