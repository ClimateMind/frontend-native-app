import { useRef, useState } from 'react';
import { Animated, FlatList, Pressable, StyleSheet, View, ViewToken } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';

import { StackParams } from 'src/navigation/UserAUnauthorizedStackNavigation';
import { CmTypography, Screen } from '@shared/components';
import { OnboardingButton, OnboardingItem, OnboardingPaginator, slides } from 'src/features/onboarding';

type Props = NativeStackScreenProps<StackParams, 'OnboardingScreen'>;

function OnboardingScreen({ navigation }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(({ viewableItems = [] }: { viewableItems: ViewToken[] }) => {
    setCurrentIndex(viewableItems[0].index || 0);
  }).current;

  function scrollForwards(toEnd = false) {
    if (currentIndex < slides.length - 1) {
      if (toEnd) {
        return slidesRef.current?.scrollToEnd();
      } else {
        slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
      }
    }

    if (currentIndex === slides.length - 1) {
      navigation.getParent()?.navigate('QuizScreen', { questionSet: 1 });
    }
  }

  function scrollBackwards() {
    if (currentIndex > 0) {
      slidesRef.current?.scrollToIndex({ index: currentIndex - 1 });
    }
  }

  return (
    <Screen style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.headerNavigation}>
          <Pressable onPress={scrollBackwards} style={{ padding: 5, opacity: currentIndex === 0 ? 0 : 1 }}>
            <AntDesign name="left" size={30} color="#07373B" style={{ transform: [{ scaleX: 0.8 }] }} />
          </Pressable>

          <Pressable style={{ padding: 5, opacity: currentIndex === slides.length - 1 ? 0 : 1 }} onPress={() => scrollForwards(true)}>
            <CmTypography variant="onboarding-button" style={{ textDecorationLine: 'underline', color: '#07373B' }}>
              Skip Tour
            </CmTypography>
          </Pressable>
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            ref={slidesRef}
            data={slides}
            renderItem={({ item }) => <OnboardingItem image={item.image} text={item.text} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
              viewAreaCoveragePercentThreshold: 50,
            }}
          />
        </View>

        <OnboardingButton text={currentIndex === 3 ? 'Take the Quiz' : 'Continue'} style={{ maxWidth: 305, marginBottom: 110 }} onPress={() => scrollForwards()} />
        <OnboardingPaginator totalIndices={slides.length} scrollX={scrollX} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 40,
    paddingHorizontal: 20,
  },
});

export default OnboardingScreen;
