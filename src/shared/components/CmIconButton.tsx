import { Pressable } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

interface Props {
  onPress: () => void;
  name: any;
  source: string;
  color: string;
  size: number;
}

function CmIconButton({ source, onPress, size, color, name }: Props) {
  const IconComponent = source === 'Entypo' ? Entypo : MaterialIcons;

  return (
    <>
      <Pressable onPress={onPress}>
        <IconComponent
          name={name}
          size={size}
          color={color}
          style={{ margin: 10, alignItems: 'center' }}
        />
      </Pressable>
    </>
  );
}

export default CmIconButton;
