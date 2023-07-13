import { StyleSheet, Text, StyleProp, TextStyle } from 'react-native';

interface Props {
  children: string | string[];
  style?: StyleProp<TextStyle>; // Accepts custom styles
}

function Headline4({ children, style }: Props) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'nunito-bold',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
});

export default Headline4;
