import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import CmTypography from './CmTypography';

interface Props {
  text: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

function CmTextButton({
  text,
  onPress = () => {},
  style = {},
  disabled = false,
}: Props) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, style]}
    >
      <CmTypography
        variant="button"
        style={[styles.buttonText, disabled && styles.buttonDisabled]}
      >
        {text}
      </CmTypography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    color: 'gray',
  },
  buttonText: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
});

export default CmTextButton;
