import { Pressable, StyleSheet, Text } from 'react-native';
import Colors from '../../assets/colors';

type Props = {
  text: string;
  icon: React.ReactNode;
  onPress: () => void;
}

function DrawerButton({ text, icon, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({pressed}) => [styles.button, pressed ? styles.buttonPressed : null]}>
      {icon}
      <Text>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    columnGap: 12,
    borderColor: Colors.themeBright,
    borderRadius: 5,
    borderWidth: 1,
    paddingVertical: 8,
    paddingLeft: 6,
    paddingRight: 15,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
  },
  buttonPressed: {
    backgroundColor: 'lightgray',
  },
});

export default DrawerButton;
