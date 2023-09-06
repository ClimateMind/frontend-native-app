import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

function Section({ children, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
});

export default Section;
