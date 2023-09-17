import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import ButtonText from 'src/components/TextStyles/ButtonText';

type Props = {
  text: string;
  icon: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

function SimpleWhiteIconTextButton({ text, icon, onPress, disabled = false, style = {} }: Props) {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        disabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row', gap: 15, width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
        {icon}
        <ButtonText style={styles.buttonText}>{text}</ButtonText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#39f5ad',
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,

  },
  buttonPressed: {
    backgroundColor: 'lightgray',
  },
  buttonDisabled: {
    backgroundColor: 'lightgray',
  },
  buttonText: {
    fontWeight: 'bold',
    paddingVertical:5,
  },
});

export default SimpleWhiteIconTextButton;
