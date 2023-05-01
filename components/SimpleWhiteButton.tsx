import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
}

function SimpleWhiteButton({ text, onPress, disabled=false }: Props) {
  return <Pressable disabled={disabled} style={({ pressed }) => [styles.button, pressed && styles.buttonPressed, disabled && styles.buttonDisabled]} onPress={onPress}>
  <Text style={styles.buttonText}>{text}</Text>
</Pressable>
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#39f5ad',
    borderWidth: 1,
    height: 50,
    minWidth: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15,
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
