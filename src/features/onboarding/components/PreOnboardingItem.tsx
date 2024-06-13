import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { CmTypography } from 'src/shared/components';

interface Props {
  text: string;
  image: ImageSourcePropType;
  reverseOrder?: boolean;
}

function PreOnboardingItem({ text, image, reverseOrder = false }: Props) {
  return (
    <View style={styles.container}>
      {reverseOrder ? (
        <>
          <Image style={styles.image} source={image} />
          <View style={styles.textContainer}>
            <CmTypography variant='h4' style={styles.text}>{text}</CmTypography>
          </View>
        </>
      ) : (
        <>
          <View style={styles.textContainer}>
            <CmTypography variant='h4' style={styles.text}>{text}</CmTypography>
          </View>
          <Image style={styles.image} source={image} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  image: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
  },
  text: {
    textAlign: 'left',
  },
});

export default PreOnboardingItem;
