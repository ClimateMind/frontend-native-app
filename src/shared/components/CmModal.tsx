import { Modal, ModalProps } from "react-native";
import CmToast from "./CmToast";

interface Props extends ModalProps {
  children?: React.ReactNode;
}

function CmModal({ children, ...rest }: Props) {
  return (
    <Modal {...rest}>
      {children}
      <CmToast />
    </Modal>
  );
}

export default CmModal;
