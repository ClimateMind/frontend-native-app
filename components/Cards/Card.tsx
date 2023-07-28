import { StyleSheet, View, ViewStyle } from "react-native";

interface Props {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

function Card({ children, style={} }: Props) {
  return (
    <View style={[styles.card, style]}>
      { children }
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: '100%',
    elevation: 5,
  },
});

export default Card;
