import { StyleProp, TextStyle } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

interface ShadowProps {
  offset: [number, number];
  distance: number;
  startColor: string;
}

interface Props {
  children: JSX.Element[] | JSX.Element;
  style?: StyleProp<TextStyle>; // Accepts custom styles
}

function Card_Shadow({ children }: Props) {
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

export default Card_Shadow;
