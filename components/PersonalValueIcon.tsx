import { Image, StyleProp, ImageStyle } from "react-native";

interface Props {
  valueName: string;
  style?: StyleProp<ImageStyle>;
}

function PersonalValueIcon({ valueName, style={} }: Props) {
  
  return (
    <>
      { valueName === 'achievement' && <Image style={style} source={require('../assets/personal-values/achievement_icon.gif')} />}
      { valueName === 'benevolence' && <Image style={style} source={require('../assets/personal-values/benevolence_icon.gif')} />}
      { valueName === 'conformity' && <Image style={style} source={require('../assets/personal-values/conformity_icon.gif')} />}
      { valueName === 'hedonism' && <Image style={style} source={require('../assets/personal-values/hedonism_icon.gif')} />}
      { valueName === 'power' && <Image style={style} source={require('../assets/personal-values/power_icon.gif')} />}
      { valueName === 'security' && <Image style={style} source={require('../assets/personal-values/security_icon.gif')} />}
      { valueName === 'self direction' && <Image style={style} source={require('../assets/personal-values/self_direction_icon.gif')} /> }
      { valueName === 'stimulation' && <Image style={style} source={require('../assets/personal-values/stimulation_icon.gif')} />}
      { valueName === 'tradition' && <Image style={style} source={require('../assets/personal-values/tradition_icon.gif')} />}
      { valueName === 'universalism' && <Image style={style} source={require('../assets/personal-values/universalism_icon.gif')} />}
    </>
  );
}

export default PersonalValueIcon;
