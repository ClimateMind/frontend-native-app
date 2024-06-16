import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { CmTypography } from "src/shared/components";

interface Props extends PressableProps {
  text?: string;
  variant?: 'light' | 'dark';
  style?: StyleProp<ViewStyle>;
}

function OnboardingButton({ text, variant = 'light', style, ...rest }: Props) {
  const backgroundColor = variant === 'light' ? '#D0EEEB' : '#07373B';
  const color = variant === 'light' ? '#07373B' : '#FFFFFF';

  return (
    <Pressable style={[styles.button, { backgroundColor, opacity: rest.disabled ? 0.3 : 1 }, style]} {...rest}>
      <CmTypography variant="onboarding-button" style={{ color }}>{text}</CmTypography>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#07373B',
    paddingVertical: 10,
    paddingLeft: 36,
    paddingRight: 29,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
  },
});

export default OnboardingButton;
