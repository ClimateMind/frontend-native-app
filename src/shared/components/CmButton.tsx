import { ActivityIndicator, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import CmTypography from './CmTypography';

interface Props {
  text: string;
  onPress?: () => void;
  color?: 'success' | 'error';
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  isLoading?: boolean
}

function CmButton({ text, onPress = () => {}, color = 'success', style = {}, disabled = false, startIcon, isLoading = false }: Props) {  
  return (
    <Pressable
      disabled={isLoading || disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        color === 'error' && { borderColor: '#ff0000' },
        pressed && styles.buttonPressed,
        style,
      ]}
    >
      {isLoading ? <ActivityIndicator size='small' color='gray' style={{ marginRight: 5 }} /> : startIcon}
      <CmTypography
        variant="button"
        style={[
          styles.buttonText,
          startIcon !== undefined && { marginLeft: 10 },
          (disabled || isLoading) && { color: 'gray' },
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
  buttonText: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
});

export default CmButton;
