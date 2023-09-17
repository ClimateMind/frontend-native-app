import { StyleSheet, Text, StyleProp, TextStyle } from 'react-native';

interface Props {
  children: string | string[];
  style?: StyleProp<TextStyle>;
}

function Headline2({ children, style }: Props) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'nunito-black',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0.8,
    textAlign: 'center',
  },
});

export default Headline2;
