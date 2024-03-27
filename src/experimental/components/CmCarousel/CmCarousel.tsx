import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import CmCarouselContent from './CmCarouselContent';

interface Props {
  data: React.ReactNode[];
}

const CmCarousel = ({ data }: Props) => {
  const scrollViewRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { width: screenWidth } = Dimensions.get('window');

  const handlePaginationPress = (index: number) => {
    setActiveIndex(index);
    if (scrollViewRef) scrollViewRef.current.scrollTo({ x: index * screenWidth, animated: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ height: 500 }}
        scrollEventThrottle={200}
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const contentOffsetX = event.nativeEvent.contentOffset.x;
          const currentIndex = Math.round(contentOffsetX / screenWidth);
          setActiveIndex(currentIndex);
        }}
      >
        {/* content of each slide*/}
        {data?.map((item, index) => (
          <View key={index} style={[styles.slide, { width: screenWidth, height: '100%' }]}>
            <CmCarouselContent>{item}</CmCarouselContent>
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {data.map((_, index) => (
          <TouchableOpacity key={index} style={[styles.paginationDot, index === activeIndex ? styles.activeDot : null]} onPress={() => handlePaginationPress(index)} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    margin: 5,
  },
  activeDot: {
    backgroundColor: 'blue',
  },
});

export default CmCarousel;
