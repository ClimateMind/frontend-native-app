import { Shadow } from 'react-native-shadow-2';
import { StyleProp, TextStyle } from 'react-native';

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
    offset: [0, 1],
    distance: 100,
    startColor: '#0004',
   
  },
};

export default Button_Shadow;
