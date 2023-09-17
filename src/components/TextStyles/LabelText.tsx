import { StyleSheet, Text, StyleProp, TextStyle } from 'react-native';

interface Props {
  children: string | string[];
  style?: StyleProp<TextStyle>;
}

function LabelText({ children, style }: Props) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'nunito-extra-bold',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.0,
  },
});

export default LabelText;
