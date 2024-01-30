import { ActivityIndicator, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import CmTypography from './CmTypography';
import Colors from 'src/assets/colors';

interface Props {
  text: string;
  onPress?: () => void;
  color?: 'success' | 'error';
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  isLoading?: boolean
}

function CmEmojiButton({ text, onPress = () => {}, color = 'success', style = {}, disabled = false, startIcon, isLoading = false }: Props) {  
  return (
    <Pressable
      disabled={isLoading || disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        color === 'error' && { borderColor: '#ff0000' },
        pressed && styles.buttonPressed,
        (disabled || isLoading) && styles.buttonDisabled,
        style,
      ]}
    >
      {isLoading ? <ActivityIndicator size='small' color='gray' style={{ marginRight: 5 }} /> : startIcon}
      <CmTypography
        variant="emoji"
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
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.userB,
    backgroundColor: 'white',
    paddingHorizontal: 0,
  },
  buttonPressed: {
    backgroundColor: 'lightgray',
  },
  buttonDisabled: {
    borderColor: 'lightgray',
  },
  buttonText: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
});

export default CmEmojiButton;
