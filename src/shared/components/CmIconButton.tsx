import { Pressable } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

interface IconTypes {
  Entypo: typeof Entypo;
  MaterialIcons: typeof MaterialIcons;
}

interface Props {
  onPress: () => void;
  name: any;
  source: keyof IconTypes;
  color: string;
  size: number;
}

function CmIconButton({ name, source, onPress, size, color }: Props) {

  const iconTypes: IconTypes = {
    Entypo: Entypo,
    MaterialIcons: MaterialIcons,
  };

  const IconComponent = iconTypes[source];

  return (
    <Pressable onPress={onPress} android_ripple={{ color: 'transparent' }}>
      <IconComponent
        name={name}
        size={size}
        color={color}
        style={{ marginHorizontal: 10, alignItems: 'center' }}
      />
    </Pressable>
  );
}

export default CmIconButton;