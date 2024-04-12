import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Dimensions, FlatList, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ClimateFeedStackParams } from 'src/navigation/Stacks/ClimateFeedStack';

import useApiClient from 'src/hooks/useApiClient';
import ClimateEffect from 'src/types/ClimateEffect';
import { CmTypography, Screen, Content, Section } from '@shared/components';
import { ClimateFeedCard } from '@features/climate-feed/components';
import { useAppSelector } from 'src/store/hooks';
import { useCmTooltip } from 'src/shared/hooks';

type Props = NativeStackScreenProps<ClimateFeedStackParams, 'ClimateFeedScreen'>;

function ClimateFeedScreen({ navigation }: Props) {
  const apiClient = useApiClient();
  const sessionId = useAppSelector((state) => state.auth.sessionId);
  const [climateFeed, setClimateFeed] = useState<ClimateEffect[]>();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { fadeOut } = useCmTooltip(fadeAnim);

  const handleScroll = (event: { nativeEvent: { contentOffset: { y: number } } }) => {
    // Set the threshold for scrolling
    const threshold = Dimensions.get('window').height;
    // Check if the user has scrolled beyond the threshold
    if (event.nativeEvent.contentOffset.y > threshold) {
      // Fade out the tooltip
      fadeOut();
    }
  };

  function gotoDetailsScreen(climateEffect: ClimateEffect) {
    navigation.navigate('ClimateDetailsScreen', { climateEffect });
  }

  useEffect(() => {
    apiClient.getClimateFeed().then((result) => setClimateFeed(result));
  }, [sessionId]);

  if (climateFeed === undefined) {
    return <ActivityIndicator size="large" color="black" style={{ marginTop: 100 }} />;
  }

  return (
    <Screen view="View">
      <Section style={{ paddingVertical: 0 }}>
        <Content style={{ alignItems: 'stretch' }}>
          <FlatList
            onScroll={handleScroll}
            ListHeaderComponent={
              <>
                <CmTypography variant="h1" style={styles.heading}>
                  Explore climate change impacts
                </CmTypography>
                <CmTypography variant="body" style={styles.text}>
                  This is your personalized homepage based on your unique climate personality. Check out these articles to stay informed!
                </CmTypography>
              </>
            }
            data={climateFeed}
            renderItem={(item) => (
              <View key={item.item.effectId} style={{ margin: 10 }}>
                <ClimateFeedCard climateEffect={item.item} onLearnMore={gotoDetailsScreen} />
              </View>
            )}
            keyExtractor={(item) => item.effectId}
          />
        </Content>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ClimateFeedScreen;
