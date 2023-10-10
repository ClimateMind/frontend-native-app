import { Modal, Pressable, StyleSheet, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import { showSuccessToast } from 'src/components/ToastMessages';
import { CmTypography } from 'src/components';
import Card from 'src/components/Cards/Card';

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
        <Card style={{ padding: 20, width: '90%' }}>

          <CmTypography variant='h4' style={styles.modalText}>Copy Link</CmTypography>
          <CmTypography variant='body' style={styles.modalText}>Unique for {recipient}</CmTypography>
          <CmTypography variant='body' style={styles.modalText}>{link}</CmTypography>

          <Pressable onPress={copyLink} style={styles.copyButton}>
            <CmTypography variant='button' style={styles.modalText}>Copy</CmTypography>
          </Pressable>

        </Card>
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
