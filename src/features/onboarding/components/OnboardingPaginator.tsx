import { Animated, StyleSheet, View, useWindowDimensions } from "react-native";

interface Props {
  currentIndex: number;
  totalIndices: number;
  scrollX: Animated.Value;
}

function OnboardingPaginator({ currentIndex, totalIndices, scrollX }: Props) {
  const { width } = useWindowDimensions();

  return (
    <View style={{ flexDirection: 'row', height: 63, justifyContent: 'center' }}>
      {[...Array(totalIndices).keys()].map((index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return <Animated.View style={[styles.dot, { width: dotWidth, opacity } ]} key={index} />
    })}
    </View>
  )
}

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#07373B',
    marginHorizontal: 8,
  }
});

export default OnboardingPaginator;
