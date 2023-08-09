import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MythsFeedStackParams } from '../../../navigation/Stacks/MythsFeedStack';

import DetailsSourcesTab from '../../../components/DetailsSourcesTabs';
import LabelText from '../../../components/TextStyles/LabelText';
import BodyText from '../../../components/TextStyles/BodyText';
import CaptionText from '../../../components/TextStyles/CaptionText';

type Props = NativeStackScreenProps<MythsFeedStackParams, 'MythDetailsScreen'>;

function MythDetailsScreen({ route }: Props) {
  const myth = route.params.myth;
  const [selectedTab, setSelectedTab] = useState(0);
  
  return (
    <ScrollView style={{ backgroundColor: 'white', padding: 20 }}>
      <LabelText style={{ color: '#B00620', marginTop: 10 }}>MYTH</LabelText>
      <BodyText style={{ color: '#B00620', letterSpacing: 1.3, fontStyle: 'italic' }}>{myth.mythTitle}</BodyText>
      <LabelText style={{ color: '#00A85F', marginTop: 40 }}>TRUTH</LabelText>
      <BodyText style={{ color: '#00A85F', letterSpacing: 1.3 }}>{myth.mythRebuttal}</BodyText>

      
      <View style={styles.tabBar}>
        <DetailsSourcesTab detailsTabName='Flawed Logic' onTabChanged={(tab) => setSelectedTab(tab)} />
      </View>

      {selectedTab === 0 && <CaptionText style={styles.description}>{myth.faultyLogicDescription}</CaptionText>}

      {selectedTab === 1 && myth.mythSources.map(source => <LabelText key={source} style={styles.link}>{source}</LabelText>)}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    marginVertical: 20,
  },
  description: {
    letterSpacing: 1,
    lineHeight: 20,
  },
  link: {
    textDecorationLine: 'underline',
    lineHeight: 20,
  },
});

export default MythDetailsScreen;
