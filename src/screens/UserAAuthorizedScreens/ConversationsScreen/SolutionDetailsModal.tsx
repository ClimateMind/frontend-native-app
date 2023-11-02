import { useEffect, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { openUrl } from 'src/utils';
import Colors from 'src/assets/colors';
import useApiClient from 'src/hooks/useApiClient';
import Solution3 from 'src/types/Solution3';
import Solution2 from 'src/types/Solution2';
import ActionCardHeader from './ActionCardHeader';
import DetailsSourcesTab from 'src/components/DetailsSourcesTabs';
import { CmTypography } from '@shared/components';

interface Props {
  open: boolean;
  solution: Solution3;
  onClose: () => void;
}

function SolutionDetailsModal({ open, solution, onClose }: Props) {
  const apiClient = useApiClient();

  const [selectedTab, setSelectedTab] = useState(0);
  const [solutionDetails, setSolutionDetails] = useState<Solution2>();

  useEffect(() => {
    apiClient.getSharedSolutionDetails(solution.solutionId)
      .then(response => {
        setSolutionDetails(response);
      });
  }, [solution]);

  if (!solutionDetails) {
    return null;
  }

  return (
    <Modal
      visible={open}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <Pressable style={{ alignItems: 'center', width: '100%', paddingTop: 20 }} onPress={onClose}>
          <CmTypography variant='label'>Close</CmTypography>
          <MaterialIcons name="keyboard-arrow-down" size={50} color={Colors.themeBright} style={{ top: -15, }} />
        </Pressable>

        <ScrollView style={{ width: '100%' }}>
          <View style={styles.header}>
            <ActionCardHeader effectSolution={solutionDetails} color='rgba(0, 0, 0, 0)' />
          </View>

          {solution.imageUrl !== null && <Image style={styles.image} source={{uri: solution.imageUrl}} />}

          <DetailsSourcesTab onTabChanged={(tab) => setSelectedTab(tab)} />

          {selectedTab === 0 && <View><CmTypography variant='body' style={styles.text}>{solutionDetails.longDescription}</CmTypography></View>}

          {selectedTab === 1 && solutionDetails.solutionSources.map(source => <View key={source} style={styles.links}>
            <Pressable onPress={() => openUrl(source)}><CmTypography variant='label' style={styles.link}>{source}</CmTypography></Pressable>
          </View>)}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: '95%',
    height: '95%',
    alignSelf: 'center',
    marginTop: '3%',
    borderRadius: 10,
    elevation: 5,
  },
  header: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 250,
  },
  text: {
    letterSpacing: 1,
    lineHeight: 20,
    padding: 20,
  },
  links: {
    alignSelf: 'flex-start',
  },
  link: {
    paddingHorizontal: 20,
    marginTop: 20,
    textDecorationLine: 'underline',
    lineHeight: 20,
  },
});

export default SolutionDetailsModal;
