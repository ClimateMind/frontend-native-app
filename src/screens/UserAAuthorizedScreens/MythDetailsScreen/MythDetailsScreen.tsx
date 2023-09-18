import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MythsFeedStackParams } from 'src/navigation/Stacks/MythsFeedStack';

import Screen from 'src/components/Screen/Screen';
import Section from 'src/components/Screen/Section';
import Content from 'src/components/Screen/Content';
import { CmTypography } from 'src/components';
import DetailsSourcesTab from 'src/components/DetailsSourcesTabs';
import BackButton from 'src/components/BackButton';

type Props = NativeStackScreenProps<MythsFeedStackParams, 'MythDetailsScreen'>;

function MythDetailsScreen({ navigation, route }: Props) {
  const myth = route.params.myth;
  const [selectedTab, setSelectedTab] = useState(0);
  
  return (
    <Screen style={{ backgroundColor: 'white' }}>
      <Section>
        <Content style={{ alignItems: 'flex-start' }}>
          <BackButton onPress={() => navigation.goBack()} />

          <CmTypography variant='label' style={{ color: '#B00620', marginTop: 10 }}>MYTH</CmTypography>
          <CmTypography variant='body' style={{ color: '#B00620', letterSpacing: 1.3, fontStyle: 'italic' }}>{myth.mythTitle}</CmTypography>
          <CmTypography variant='label' style={{ color: '#00A85F', marginTop: 40 }}>TRUTH</CmTypography>
          <CmTypography variant='body' style={{ color: '#00A85F', letterSpacing: 1.3 }}>{myth.mythRebuttal}</CmTypography>

          <View style={styles.tabBar}>
            <DetailsSourcesTab detailsTabName='Flawed Logic' onTabChanged={(tab) => setSelectedTab(tab)} />
          </View>

          {selectedTab === 0 && <CmTypography variant='caption' style={styles.description}>{myth.faultyLogicDescription}</CmTypography>}

          {selectedTab === 1 && myth.mythSources.map(source => <CmTypography variant='label' key={source} style={styles.link}>{source}</CmTypography>)}
        </Content>
      </Section>
    </Screen>
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
