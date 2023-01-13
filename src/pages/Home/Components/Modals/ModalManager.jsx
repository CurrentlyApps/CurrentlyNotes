import {useSelector} from "react-redux";
import SharingModal from "pages/Home/Components/Modals/Sharing/SharingModal";
import AccountSettings from "./Settings/AccountSettings/AccountSettings";
import RequireVerificationModal from "./RequireVerification/RequireVerificationModal";

export default function ModalManager() {
  const currentModal = useSelector((state) => state.uiModal.modal);
  if (!currentModal) {
    return null;
  }

  if (currentModal === "ShareOptions") {
    return <SharingModal />;
  } else if (currentModal === "AccountSettings") {
    return <AccountSettings />;
  } else if (currentModal === "RequireVerification") {
    return <RequireVerificationModal />;
  }
}