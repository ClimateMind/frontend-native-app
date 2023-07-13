import { useEffect, useState } from "react";
import { Image, Modal, ScrollView, StyleSheet, View } from "react-native";

import ClimateEffect2 from "../../../types/ClimateEffect2";
import ClimateEffect3 from "../../../types/ClimateEffect3";
import { capitalizeFirstLetter } from "../../../utils";
import DetailsSourcesTab from "../../../components/DetailsSourcesTabs";
import useApiClient from "../../../hooks/useApiClient";
import BodyText from "../../../components/TextStyles/BodyText";
import CaptionText from "../../../components/TextStyles/CaptionText";
import LabelText from "../../../components/TextStyles/LabelText";

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

          <BodyText style={styles.title}>{capitalizeFirstLetter(actionDetails.effectTitle)}</BodyText>
          {actionDetails.imageUrl !== null && <Image style={styles.image} source={{uri: actionDetails.imageUrl}} />}

          <DetailsSourcesTab onTabChanged={(tab) => setSelectedTab(tab)} />

          {selectedTab === 0 && <View>
            <CaptionText style={styles.text}>{actionDetails.longDescription}</CaptionText>
          </View>}

          {selectedTab === 1 && actionDetails.effectSources.map(source => <View key={source} style={styles.links}><LabelText style={styles.link}>{source}</LabelText></View>)}

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
  title: {
    padding: 20,
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
    padding: 10,
  },
  link: {
    paddingHorizontal: 20,
    textDecorationLine: 'underline',
    lineHeight: 20,
  },
});

export default ActionDetailsModal;
