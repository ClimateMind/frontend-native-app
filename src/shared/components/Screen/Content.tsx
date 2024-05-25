import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface Props {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

function Content({ children, style }: Props) {
  return <View style={[styles.content, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    maxWidth: 640,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default Content;
