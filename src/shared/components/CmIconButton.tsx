import { Pressable } from 'react-native';
import { MaterialIcons, Entypo  } from '@expo/vector-icons';

interface Props {
  onPress: () => void;
  iconType: keyof typeof MaterialIcons.glyphMap;
}

function CmIconButton({ onPress, iconType }: Props) {
  return (
    <>
      <Pressable onPress={onPress}>
        <MaterialIcons
          name={iconType}
          size={22}
          color="black"
          style={{ margin: 10, alignItems: 'center' }}
        />
      </Pressable>
    </>
  );
}

export default CmIconButton;
