import { StyleSheet, Text, StyleProp, TextStyle } from 'react-native';

interface Props {
  children: string | string[];
  style?: StyleProp<TextStyle>;
}

function CaptionText({ children, style }: Props) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'nunito',
    fontSize: 12,
    lineHeight: 16,
  },
});

export default CaptionText;
