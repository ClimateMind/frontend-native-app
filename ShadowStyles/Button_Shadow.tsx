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

function Button_Shadow({ children }: Props) {
  return (
    <Shadow {...ShadowPresets.container} style={{ alignSelf: 'stretch'}}>
      {children}
    </Shadow>
  );
}
const ShadowPresets: { container: ShadowProps } = {
  container: {
    offset: [0, 2],
    distance: 5,
    startColor: '#0003',
   
  },
};

export default Button_Shadow;
