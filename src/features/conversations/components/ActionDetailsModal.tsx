import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { capitalizeFirstLetter, openUrl } from 'src/utils';
import Colors from 'src/assets/colors';
import ClimateEffect2 from 'src/types/ClimateEffect2';
import ClimateEffect3 from 'src/types/ClimateEffect3';
import useApiClient from 'src/hooks/useApiClient';
import { CmModal, CmTypography, DetailsSourcesTab } from '@shared/components';

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
    <CmModal
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

          <CmTypography variant='h3' style={styles.title}>{capitalizeFirstLetter(actionDetails.effectTitle)}</CmTypography>
          {actionDetails.imageUrl !== null && <Image style={styles.image} source={{uri: actionDetails.imageUrl}} />}

          <DetailsSourcesTab onTabChanged={(tab) => setSelectedTab(tab)} />

          {selectedTab === 0 && <View>
            <CmTypography variant='body' style={styles.text}>{actionDetails.longDescription}</CmTypography>
          </View>}

          {selectedTab === 1 && actionDetails.effectSources.map(source => <View key={source} style={styles.links}>
            <Pressable onPress={() => openUrl(source)}><CmTypography variant='label' style={styles.link}>{source}</CmTypography></Pressable>
          </View>)}

        </ScrollView>
      </View>
    </CmModal>
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
    textAlign: 'left',
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

export default ActionDetailsModal;
