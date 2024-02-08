import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ClimateFeedStackParams } from 'src/navigation/Stacks/ClimateFeedStack';

import useApiClient from 'src/hooks/useApiClient';
import ClimateEffect from 'src/types/ClimateEffect';
import { CmTypography, Screen, Content, Section } from '@shared/components';
import { ClimateFeedCard } from '@features/climate-feed/components';
import { useAppSelector } from 'src/store/hooks';
import { GetQuestions } from 'src/api/responses';

type Props = NativeStackScreenProps<ClimateFeedStackParams, 'ClimateFeedScreen'>;

function ClimateFeedScreen({ navigation }: Props) {
  const apiClient = useApiClient();
  const sessionId = useAppSelector((state) => state.auth.sessionId);
  const [climateFeed, setClimateFeed] = useState<ClimateEffect[]>();
  const [personalValues, setPersonalValues] = useState<GetQuestions>();
  
  function gotoDetailsScreen(climateEffect: ClimateEffect) {
    navigation.navigate('ClimateDetailsScreen', { climateEffect });
  }

  useEffect(() => {
    apiClient.getClimateFeed().then((result) => setClimateFeed(result));
  
  }, [sessionId]);

  useEffect(()=>{
    apiClient.getQuestions().then((result) => setPersonalValues(result));
  })


  if (climateFeed === undefined || personalValues === undefined) {
    return <ActivityIndicator size='large' color='black' style={{ marginTop: 100 }} />;
  }
  
//2d array
const pValues = climateFeed.map(item=>item.relatedPersonalValues)
const setOne = personalValues.SetOne.map(item=>[item.question, item.value])
const tooltip = pValues.map(item=>{
return item && setOne.filter(item2=> item.includes(item2[1]) && item2[1] + item2[0])
  })

  return (
    <Screen view="View">
      <Section style={{ paddingVertical: 0 }}>
        <Content style={{ alignItems: 'stretch' }}>
          <FlatList
            ListHeaderComponent={
              <>
                <CmTypography variant='h1' style={styles.heading}>Explore climate change impacts</CmTypography>
                <CmTypography variant='body' style={styles.text}>
                  This is your personalized homepage based on your unique climate personality. Check out
                  these articles to stay informed!
                </CmTypography>
              </>
            }
            data={climateFeed}
            renderItem={(item) => (
              <View key={item.item.effectId} style={{ margin: 10 }}>
               
                <ClimateFeedCard climateEffect={item.item} onLearnMore={gotoDetailsScreen}  description={tooltip}/>
               
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
