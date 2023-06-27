import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MythsFeedStackParams } from '../../../navigation/MythsFeedStack';
import { StyleSheet } from 'react-native';
import DetailsSourcesTab from '../../../components/DetailsSourcesTabs';

type Props = NativeStackScreenProps<MythsFeedStackParams, 'MythDetailsScreen'>;

function MythDetailsScreen({ route }: Props) {
  const myth = route.params.myth;
  const [selectedTab, setSelectedTab] = useState(0);
  
  return (
    <ScrollView style={{ backgroundColor: 'white', padding: 10 }}>
      <Text style={[styles.smallText, { color: '#B00620' }]}>MYTH</Text>
      <Text style={[styles.largeText, { color: '#B00620' }]}>{myth.mythTitle}</Text>
      <Text style={[styles.smallText, { color: '#00A85F' }]}>TRUTH</Text>
      <Text style={[styles.largeText, { color: '#00A85F' }]}>{myth.mythRebuttal}</Text>
      
      <View style={styles.tabBar}>
        <DetailsSourcesTab detailsTabName='Flawed Logic' onTabChanged={(tab) => setSelectedTab(tab)} />
      </View>

      {selectedTab === 0 && <Text style={styles.description}>{myth.faultyLogicDescription}</Text>}

      {selectedTab === 1 && myth.mythSources.map(source => <Text key={source} style={styles.link}>{source}</Text>)}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  smallText: {
    letterSpacing: 1,
    fontSize: 10,
    marginTop: 30,
  },
  largeText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabBar: {
    marginVertical: 20,
  },
  description: {
    letterSpacing: 1,
  },
  link: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    lineHeight: 20,
  },
});

export default MythDetailsScreen;
