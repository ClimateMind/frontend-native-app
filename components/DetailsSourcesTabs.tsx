import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

interface Props {
  detailsTabName?: string;
  onTabChanged: (tab: number) => void;
}

function DetailsSourcesTab({ onTabChanged, detailsTabName='Details' }: Props) {
  const [selectedTab, setSelectedTab] = useState(0);
  
  return (
    <View style={styles.tabBar}>
      <Pressable style={[styles.tabButton, selectedTab === 0 ? styles.tabButtonActive : styles.tabButtonInactive ]} onPress={() => {setSelectedTab(0); onTabChanged(0)}}>
        <MaterialCommunityIcons name="clipboard-text-outline" size={24} color="black" />
        <Text>{detailsTabName}</Text>
      </Pressable>
      <Pressable style={[styles.tabButton, selectedTab === 1 ? styles.tabButtonActive : styles.tabButtonInactive ]} onPress={() => {setSelectedTab(1); onTabChanged(1)}}>
        <AntDesign name="filetext1" size={24} color="black" />
        <Text>Sources</Text>
      </Pressable>
  </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
