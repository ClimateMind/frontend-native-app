import { Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CmTypography from "./CmTypography";

interface Props {
  checked: boolean;
  text: string;
  onPress: () => void;
}

function CmCheckbox({ checked, text, onPress }: Props) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {checked && <MaterialCommunityIcons name="checkbox-marked" size={24} color="black" />}
      {!checked && <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="black" />}
      <CmTypography variant="body">{text}</CmTypography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default CmCheckbox;
