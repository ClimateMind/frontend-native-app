import { StyleSheet, Text, StyleProp, TextStyle } from 'react-native';

interface Props {
  children: string | string[];
  style?: StyleProp<TextStyle>;
}

function ButtonText({ children, style }: Props) {
  const textContent = Array.isArray(children)
    ? children.join(' ')
    : children;

  return <Text style={[styles.text, style]}>{textContent.toUpperCase()}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'nunito-bold',
    fontSize: 14,
    letterSpacing: 3.2,
    textAlign: 'center',
  },
});

export default ButtonText;
