import { Image, StyleSheet, useWindowDimensions, View } from "react-native";
import { CmTypography } from "src/shared/components";

interface Props {
  image: any;
  text: string;
}

function OnboardingItem({ image, text }: Props) {
  const { width } = useWindowDimensions();

  return (
    <View style={{ alignItems: 'center', width, paddingTop: '25%' }}>
      <Image source={image} style={[styles.image, { width: width * 0.7, resizeMode: 'contain' }]} />

      <View>
        <CmTypography variant="body" style={styles.text}>{text}</CmTypography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: '45%',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'nunito-extra-bold',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    color: '#07373B',
    marginHorizontal: 20,
    marginTop: 60,
    maxWidth: 305,
  },
});

export default OnboardingItem;
