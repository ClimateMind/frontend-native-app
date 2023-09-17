import { StyleSheet, Text, StyleProp, TextStyle } from 'react-native';

interface Props {
  children: string | string[];
  style?: StyleProp<TextStyle>;
}

function Headline1({ children, style }: Props) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'nunito-black',
    fontSize: 32,
    lineHeight: 32,
    letterSpacing: 0.8,
    textAlign: 'center',
  },
});

export default Headline1;
