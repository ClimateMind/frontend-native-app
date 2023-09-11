import { StyleSheet, StyleProp, Text, TextProps, TextStyle } from 'react-native';

interface Props extends TextProps {
  children: string | string[];
  variant: 'h1'| 'h2'| 'h3'| 'h4'| 'body'| 'body-italics'| 'button'| 'caption'| 'label'| 'overline';
  style?: StyleProp<TextStyle>;
}

function ButtonText({ children, variant, style, ...rest }: Props) {
  const textContent = Array.isArray(children) ? children.join(' ') : children;
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

    return <Text style={[textStyle, style]} {...rest}>{textContent}</Text>;
}

const styles = StyleSheet.create({
  headline1: {
    fontFamily: 'nunito-black',
    fontSize: 32,
    lineHeight: 32,
    letterSpacing: 0.8,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  headline2: {
    fontFamily: 'nunito-black',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0.8,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  headline3: {
    fontFamily: 'nunito-black',
    fontSize: 18,
    lineHeight: 24.5,
    letterSpacing: 1.6,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  headline4: {
    fontFamily: 'nunito-bold',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  body: {
    fontFamily: 'nunito',
    fontSize: 16,
    lineHeight: 22,
    textTransform: 'capitalize',
  },
  bodyItalics: {
    fontFamily: 'nunito-italic',
    fontSize: 16,
    lineHeight: 22,
    textTransform: 'capitalize',
  },
  button: {
    fontFamily: 'nunito-bold',
    fontSize: 14,
    letterSpacing: 3.2,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  caption: {
    fontFamily: 'nunito',
    fontSize: 12,
    lineHeight: 16,
    textTransform: 'capitalize',
  },
  label: {
    fontFamily: 'nunito-extra-bold',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.0,
    textTransform: 'capitalize',
  },
  overline: {
    fontFamily: 'nunito-bold',
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 3.2,
    textTransform: 'uppercase',
  },
});

export default ButtonText;
