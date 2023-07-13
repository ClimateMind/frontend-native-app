import { Modal, Pressable, StyleSheet, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import { showSuccessToast } from '../../../components/ToastMessages';
import Headline4 from '../../../components/TextStyles/Headline4';
import BodyText from '../../../components/TextStyles/BodyText';
import ButtonText from '../../../components/TextStyles/ButtonText';

interface Props {
  show: boolean;
  recipient: string;
  link: string;
  onClose: () => void;
}

function CopyLinkModal({ show, recipient, link, onClose }: Props) {
  function copyLink() {
    Clipboard.setStringAsync(link);
    showSuccessToast('Link copied!');
    onClose();
  }

  return (
    <Modal visible={show} animationType="fade" transparent={true}>
      <View style={styles.centerModal}>
        <View style={styles.modalCard}>
          <Headline4 style={styles.modalText}>Copy Link</Headline4>
          <BodyText style={styles.modalText}>Unique for {recipient}</BodyText>
          <BodyText style={styles.modalText}>{link}</BodyText>

          <Pressable onPress={copyLink} style={styles.copyButton}>
            <ButtonText style={styles.modalText}>Copy</ButtonText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalCard: {
    padding: 20,
    backgroundColor: 'white',
    width: '90%',
  },
  copyButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalText: {
    padding: 8,
    marginBottom: 15,
    textAlign: 'left',
  },
});

export default CopyLinkModal;
