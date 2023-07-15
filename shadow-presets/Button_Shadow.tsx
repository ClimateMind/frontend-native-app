import { Shadow } from 'react-native-shadow-2';
import { StyleProp, TextStyle } from 'react-native';

interface ShadowProps {
  offset: [number, number];
  distance: number;
  startColor: string;
}

interface Props {
  children: any;
  style?: StyleProp<TextStyle>; // Accepts custom styles
}

function Button_Shadow({ children }: Props) {
  return (
    <Shadow {...ShadowPresets.container} style={{ alignSelf: 'stretch' }}>
      {children}
    </Shadow>
  );
}
const ShadowPresets: { container: ShadowProps } = {
  container: {
    offset: [0, 5],
    distance: 10,
    startColor: '#0002',
  },
};

export default Button_Shadow;
