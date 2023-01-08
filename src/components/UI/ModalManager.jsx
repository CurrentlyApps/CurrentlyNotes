import {useSelector} from "react-redux";
import SharingModal from "../SharingModal/SharingModal";

export default function ModalManager() {
  const currentModal = useSelector((state) => state.uiModal.modal);
  if (!currentModal) {
    return null;
  }
  if (currentModal === "ShareOptions") {
    return <SharingModal />;
  }
}