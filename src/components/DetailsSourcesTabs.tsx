import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { CmTypography } from '.';

interface Props {
  detailsTabName?: string;
  onTabChanged: (tab: number) => void;
}

function DetailsSourcesTab({ onTabChanged, detailsTabName='Details' }: Props) {
  const [selectedTab, setSelectedTab] = useState(0);
  
  return (
    <View style={styles.tabBar}>
      <Pressable style={[styles.tabButton, selectedTab === 0 ? styles.tabButtonActive : styles.tabButtonInactive ]} onPress={() => {setSelectedTab(0); onTabChanged(0)}}>
        <MaterialCommunityIcons name="clipboard-text" size={20} color="black" />
        <CmTypography variant='label' style={{ padding: 5 }}>{detailsTabName}</CmTypography>
      </Pressable>
      <Pressable style={[styles.tabButton, selectedTab === 1 ? styles.tabButtonActive : styles.tabButtonInactive ]} onPress={() => {setSelectedTab(1); onTabChanged(1)}}>
        <FontAwesome name="file-text" size={20} color="black" />
        <CmTypography variant='label' style={{ padding: 5 }}>Sources</CmTypography>
      </Pressable>
  </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  tabButton: {
    padding: 10,
    alignItems: 'center',
  },
  tabButtonActive: {
    borderBottomColor: '#39f5ad',
    borderBottomWidth: 2,
  },
  tabButtonInactive: {
    opacity: 0.2,
  },
});

export default DetailsSourcesTab;
