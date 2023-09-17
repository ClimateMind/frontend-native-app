import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import ButtonText from "src/components/TextStyles/ButtonText";

interface Props {
  onPress: () => void;
}

function BackButton({ onPress }: Props) {
  return (
    <Pressable style={styles.backButtonContainer} onPress={onPress}>
      <Ionicons name="chevron-back-outline" size={24} color="#A347FF" />
      <ButtonText style={styles.backButtonText}>BACK</ButtonText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButtonContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertically: 20,
  },
  backButtonText: {
    marginLeft: 10,
  },
});

export default BackButton;
