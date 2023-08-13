import { StyleProp, ViewStyle } from "react-native";
import SimpleWhiteTextButton from "../../../components/SimpleWhiteTextButton";
import useApiClient from "../../../hooks/useApiClient";

interface Props {
  conversationId: string;
  conversationState: number;
  style: StyleProp<ViewStyle>;
  onClick: () => void;
}

function ViewSelectedTopicsButton({ conversationId, conversationState, style, onClick }: Props) {
  const apiClient = useApiClient();

  function handleButtonClick() {
    apiClient.putSingleConversation({
      conversationId,
      updatedConversation: {
        state: 3,
      },
    })
    
    onClick();
  }
  
  return (
    <SimpleWhiteTextButton
      style={style}
      disabled={conversationState < 2}
      text="VIEW SELECTED TOPICS"
      onPress={handleButtonClick}
    />
  );
}

export default ViewSelectedTopicsButton;
