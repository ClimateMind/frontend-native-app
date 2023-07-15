import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

type Props = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

function SimpleWhiteButton({ text, onPress, disabled = false, style = {} }: Props) {
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
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#39f5ad',
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonPressed: {
    backgroundColor: 'lightgray',
  },
  buttonDisabled: {
    backgroundColor: 'lightgray',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default SimpleWhiteButton;
