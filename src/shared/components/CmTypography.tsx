import { StyleSheet, StyleProp, Text, TextProps, TextStyle } from 'react-native';

interface Props extends React.PropsWithChildren, TextProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'body-italics' | 'button' | 'onboarding-button' | 'caption' | 'label' | 'overline';
  style?: StyleProp<TextStyle>;
}

function CmTypography({ children, variant, style, ...rest }: Props) {
  let textStyle: StyleProp<TextStyle>;

  switch (variant) {
    case 'h1':
      textStyle = styles.headline1;
      break;
    case 'h2':
      textStyle = styles.headline2;
      break;
    case 'h3':
      textStyle = styles.headline3;
      break;
    case 'h4':
      textStyle = styles.headline4;
      break;
    case 'body':
      textStyle = styles.body;
      break;
    case 'body-italics':
      textStyle = styles.bodyItalics;
      break;
    case 'button':
      textStyle = styles.button;
      break;
    case 'onboarding-button':
      textStyle = styles.onboardingButton;
      break;
    case 'caption':
      textStyle = styles.caption;
      break;
    case 'label':
      textStyle = styles.label;
      break;
    case 'overline':
      textStyle = styles.overline;
      break;
    default:
      textStyle = styles.body;
      break;
  }

  return (
    <Text style={[textStyle, style]} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  headline1: {
    fontFamily: 'nunito-black',
    fontSize: 32,
    lineHeight: 32,
    letterSpacing: 0.8,
    textAlign: 'center',
    paddingTop: 8,
  },
  headline2: {
    fontFamily: 'nunito-black',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0.8,
    textAlign: 'center',
  },
  headline3: {
    fontFamily: 'nunito-black',
    fontSize: 18,
    lineHeight: 24.5,
    letterSpacing: 1.6,
    textAlign: 'center',
  },
  headline4: {
    fontFamily: 'nunito-bold',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  body: {
    fontFamily: 'nunito',
    fontSize: 16,
    lineHeight: 22,
  },
  bodyItalics: {
    fontFamily: 'nunito-italic',
    fontSize: 16,
    lineHeight: 22,
  },
  button: {
    fontFamily: 'nunito-bold',
    fontSize: 14,
    letterSpacing: 3.2,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  onboardingButton: {
    fontFamily: 'nunito-bold',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  caption: {
    fontFamily: 'nunito',
    fontSize: 12,
    lineHeight: 16,
  },
  label: {
    fontFamily: 'nunito-extra-bold',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.0,
  },
  overline: {
    fontFamily: 'nunito-bold',
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 3.2,
    textTransform: 'uppercase',
  },
});

export default CmTypography;
