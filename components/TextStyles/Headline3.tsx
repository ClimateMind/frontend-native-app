import { StyleSheet, Text, StyleProp, TextStyle } from 'react-native';

interface Props {
  children: string | string[];
  style?: StyleProp<TextStyle>; // Accepts custom styles
}

function Headline3({ children, style }: Props) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'nunito-black',
    fontSize: 18,
    lineHeight: 24.5,
    letterSpacing: 1.6,
    textAlign: 'center',
  },
});

export default Headline3;
