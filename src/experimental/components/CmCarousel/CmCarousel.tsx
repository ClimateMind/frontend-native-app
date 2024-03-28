import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import CmCarouselContent from './CmCarouselContent';
import { AntDesign } from '@expo/vector-icons';

interface Props {
  data: React.ReactNode[];
}

const CmCarousel = ({ data }: Props) => {
  const scrollViewRef = useRef<any>(null);
  const arrowIconRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // could have 3 states for each index with different timings for autoscroll

  const { width: screenWidth } = Dimensions.get('window');

  const handlePaginationPress = (index: number) => {
    setActiveIndex(index);
    if (scrollViewRef) scrollViewRef.current.scrollTo({ x: index * screenWidth, animated: true });
  };

  useEffect(() => {
    const intervalId = setInterval(autoScroll, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const autoScroll = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = prevIndex === data.length - 1 ? 0 : prevIndex + 1;
      scrollViewRef.current?.scrollTo({ x: newIndex * screenWidth, animated: true });
      return newIndex;
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ height: '100%' }}
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
          <View>
            <View key={index} style={[styles.slide, { height: '100%', width: screenWidth }]}>
              {/* if we have 3 different index states we will need return 3 x </CmCarouselContent> and dev screen would only have one component or the 3 states could be raised up to the dev screen as an alternative */}
              <CmCarouselContent style={{ paddingHorizontal: 20 }}>{item}</CmCarouselContent>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* arrows */}
      <TouchableOpacity
        style={styles.arrowRight}
        onPress={() => {
          console.log('click');
          setActiveIndex((prevIndex) => {
            let newIndex = 0;
            if (activeIndex < 2) {
              newIndex = prevIndex + 1;
            }
            scrollViewRef.current?.scrollTo({ x: newIndex * screenWidth, animated: true });
            return newIndex;
          });
        }}
      >
        {activeIndex < 2 && <AntDesign name="rightcircle" size={30} color="black" />}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.arrowLeft}
        ref={arrowIconRef}
        onPress={() => {
          console.log('click');
          setActiveIndex((prevIndex) => {
            let newIndex = 0;
            if (activeIndex > 0) {
              newIndex = prevIndex - 1;
            }
            scrollViewRef.current?.scrollTo({ x: newIndex * screenWidth, animated: true });
            return newIndex;
          });
        }}
      >
        {activeIndex > 0 && <AntDesign name="leftcircle" size={30} color="black" />}
      </TouchableOpacity>

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
  arrowRight: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: '50%',
    left: '80%',
  },
  arrowLeft: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: '50%',
    right: '80%',
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
