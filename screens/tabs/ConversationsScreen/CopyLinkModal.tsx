import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import { showSuccessToast } from '../../../components/ToastMessages';

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
          <Text style={[styles.modalText, { fontWeight: 'bold' }]}>Copy Link</Text>
          <Text style={styles.modalText}>Unique for {recipient}</Text>
          <Text style={styles.modalText}>{link}</Text>

          <Pressable onPress={copyLink} style={styles.copyButton}>
            <Text style={styles.modalText}>Copy</Text>
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
    marginBottom: 15,
    textAlign: 'left',
  },
});

export default CopyLinkModal;
