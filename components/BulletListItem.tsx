import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Entypo } from '@expo/vector-icons';

interface Props {
  children: string;
  textStyle: StyleProp<ViewStyle>;
}

function BulletListItem({ children, textStyle }: Props) {
  return (
    <View style={styles.container}>
      <Entypo name="dot-single" size={24} color="black" style={{position: 'relative', top: 4}} />
      <Text style={textStyle}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
});

export default BulletListItem;
