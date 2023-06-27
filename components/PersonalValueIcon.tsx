import { Image, StyleProp, ImageStyle } from "react-native";

interface Props {
  valueName: string;
  style?: StyleProp<ImageStyle>;
}

function PersonalValueIcon({ valueName, style={} }: Props) {
  return (
    <>
      { valueName === 'achievement' && <Image style={style} source={require('../assets/personal-values/achievement_icon.png')} />}
      { valueName === 'benevolence' && <Image style={style} source={require('../assets/personal-values/benevolence_icon.png')} />}
      { valueName === 'conformity' && <Image style={style} source={require('../assets/personal-values/conformity_icon.png')} />}
      { valueName === 'hedonism' && <Image style={style} source={require('../assets/personal-values/hedonism_icon.png')} />}
      { valueName === 'power' && <Image style={style} source={require('../assets/personal-values/power_icon.png')} />}
      { valueName === 'security' && <Image style={style} source={require('../assets/personal-values/security_icon.png')} />}
      { valueName === 'self direction' && <Image style={style} source={require('../assets/personal-values/self_direction_icon.png')} /> }
      { valueName === 'stimulation' && <Image style={style} source={require('../assets/personal-values/stimulation_icon.png')} />}
      { valueName === 'tradition' && <Image style={style} source={require('../assets/personal-values/tradition_icon.png')} />}
      { valueName === 'universalism' && <Image style={style} source={require('../assets/personal-values/universalism_icon.png')} />}
    </>
  );
}

export default PersonalValueIcon;
