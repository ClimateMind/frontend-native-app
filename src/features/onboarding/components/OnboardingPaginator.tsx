import { Animated, StyleSheet, View, useWindowDimensions } from "react-native";

interface Props {
  totalIndices: number;
  scrollX: Animated.Value;
}

function OnboardingPaginator({ totalIndices, scrollX }: Props) {
  const { width } = useWindowDimensions();

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 50 }}>
      {[...Array(totalIndices).keys()].map((index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
        });

        return (
          <View style={styles.dot} key={index}>
            <Animated.View style={{ flex: 1, opacity, backgroundColor: '#07373B' }} />
          </View>
        );
    })}
    </View>
  )
}

const styles = StyleSheet.create({
  dot: {
    width: 35,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: 'black',
  }
});

export default OnboardingPaginator;
