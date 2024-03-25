import { Dimensions, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';
import CmCarouselContent from './CmCarouselContent';
import useApiClient from 'src/hooks/useApiClient';
import { useEffect, useState } from 'react';
import { GetPersonalValues } from 'src/api/responses';
import { useAppSelector } from 'src/store/hooks';
interface Props {
  data: React.ReactNode[];
}

function CmCarousel({ data }: Props) {
  const quizId = useAppSelector((state) => state.auth.user.quizId);
  const [personalValues, setPersonalValues] = useState<GetPersonalValues>();
  const apiClient = useApiClient();

  useEffect(() => {
    if (!quizId) {
      return;
    }

    apiClient.getPersonalValues(quizId).then((result) => setPersonalValues(result));
  }, [quizId]);

  const width = Dimensions.get('window').width;

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={900 / 2}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={7000}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              marginHorizontal: 10,
              borderWidth: 1,
            }}
          >
            <CmCarouselContent>{item}</CmCarouselContent>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default CmCarousel;
