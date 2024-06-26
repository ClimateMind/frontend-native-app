import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { CmTypography } from "src/shared/components";

interface Props {
  image: any;
  text: string;
}

function OnboardingItem({ image, text }: Props) {
  const { width } = useWindowDimensions();

  return (
    <View style={{ alignItems: 'center', width }}>
      <Image source={image} style={[styles.image, { maxWidth: '85%', height: width * 0.93, resizeMode: 'contain' }]} />

      <View>
        <CmTypography variant="body" style={styles.text}>{text}</CmTypography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'nunito-extra-bold',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    color: '#07373B',
    marginHorizontal: 20,
    maxWidth: 305,
    marginTop: 40,
  },
});

export default OnboardingItem;
