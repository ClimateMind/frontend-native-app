import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import ButtonText from './TextStyles/ButtonText';

type Props = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

function SimpleWhiteTextButton({ text, onPress, disabled = false, style = {} }: Props) {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        disabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
    >
      <ButtonText style={styles.buttonText}>{text}</ButtonText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#39f5ad',
    borderWidth: 1,
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
    flexShrink:1, 
    flexWrap: 'wrap',
    fontWeight: 'bold',
    paddingVertical:5,
    paddingHorizontal:5
  },
});

export default SimpleWhiteTextButton;
