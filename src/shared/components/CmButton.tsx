import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import CmTypography from './CmTypography';

interface Props {
  text: string;
  onPress?: () => void;
  color?: 'success' | 'error';
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  startIcon?: React.ReactNode;
}

function CmButton({ text, onPress = () => {}, color = 'success', style = {}, disabled = false, startIcon }: Props) {  
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        color === 'error' && { borderColor: '#ff0000' },
        pressed && styles.buttonPressed,
        disabled && styles.buttonDisabled,
        style,
      ]}
    >
      {startIcon}
      <CmTypography
        variant="button"
        style={[
          styles.buttonText,
          startIcon !== undefined && { marginLeft: 10 },
        ]}
      >
        {text}
      </CmTypography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#39f5ad',
    borderWidth: 1,
    minHeight: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    backgroundColor: 'lightgray',
  },
  buttonDisabled: {
    backgroundColor: 'lightgray',
  },
  buttonText: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
});

export default CmButton;
