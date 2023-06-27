import { useEffect, useState } from "react";
import { Image, Modal, ScrollView, StyleSheet, Text, View } from "react-native";

import ClimateEffect2 from "../../../types/ClimateEffect2";
import ClimateEffect3 from "../../../types/ClimateEffect3";
import { capitalizeFirstLetter } from "../../../utils";
import DetailsSourcesTab from "../../../components/DetailsSourcesTabs";
import useApiClient from "../../../hooks/useApiClient";

interface Props {
  open: boolean;
  action: ClimateEffect2;
  onClose: () => void;
}

function ActionDetailsModal({ open, action, onClose }: Props) {
  const apiClient = useApiClient();
  
  const [actionDetails, setActionDetails] = useState<ClimateEffect3>();
  const [selectedTab, setSelectedTab] = useState(0);
  
  useEffect(() => {
    apiClient.getSharedImpactDetails(action.effectId)
      .then(response => {
        setActionDetails(response);
      });
  }, [action]);
  
  if (!actionDetails) {
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

          <Text style={styles.title}>{capitalizeFirstLetter(actionDetails.effectTitle)}</Text>
          {actionDetails.imageUrl !== null && <Image style={styles.image} source={{uri: actionDetails.imageUrl}} />}

          <DetailsSourcesTab onTabChanged={(tab) => setSelectedTab(tab)} />

          {selectedTab === 0 && <View>
            <Text style={styles.description}>{actionDetails.longDescription}</Text>
          </View>}

          {selectedTab === 1 && actionDetails.effectSources.map(source => <View key={source} style={styles.links}><Text style={styles.link}>{source}</Text></View>)}

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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
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

export default ActionDetailsModal;
