import { StyleSheet, Text, StyleProp, TextStyle } from 'react-native';

interface Props {
  children: string | string[];
  style?: StyleProp<TextStyle>; // Accepts custom styles
}

function BodyTextItalics({ children, style }: Props) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'nunito-italic',
    fontSize: 16,
    lineHeight: 22,
  },
});

export default BodyTextItalics;
