import { useEffect, useState } from "react";
import { Image, Modal, ScrollView, Text, View } from "react-native";

import useApiClient from "../../../hooks/useApiClient";
import Solution3 from "../../../types/Solution3";
import Solution2 from "../../../types/Solution2";
import { StyleSheet } from "react-native";
import ActionCardHeader from "./ActionCardHeader";
import DetailsSourcesTab from "../../../components/DetailsSourcesTabs";

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
        <ScrollView style={{ width: '100%' }}>
          <View style={styles.header}>
            <ActionCardHeader effectSolution={solutionDetails} color='rgba(0, 0, 0, 0)' />
          </View>

          {solution.imageUrl !== null && <Image style={styles.image} source={{uri: solution.imageUrl}} />}

          <DetailsSourcesTab onTabChanged={(tab) => setSelectedTab(tab)} />

          {selectedTab === 0 && <View><Text style={styles.description}>{solutionDetails.longDescription}</Text></View>}
          {selectedTab === 1 && solutionDetails.solutionSources.map(source => <View key={source} style={styles.links}><Text style={styles.link}>{source}</Text></View>)}
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
    borderWidth: 1,
    elevation: 5,
  },
  header: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 250,
  },
  description: {
    letterSpacing: 1,
    padding: 10,
  },
  links: {
    padding: 10,
  },
  link: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    lineHeight: 20,
  },
});

export default SolutionDetailsModal;
