import { Modal, } from "flowbite-react";
import {useDispatch} from "react-redux";
import {closeModal} from "stores/UI/uiModals";

import GoogleProviderSettings from "./GoogleProviderSetting";
import EmailProviderSettings from "./EmailProviderSettings";
import PasswordSettings from "./PasswordSettings";

export default function AccountSettings() {
  const dispatch = useDispatch();

  return (
    <Modal popup={true} show={true} size={"3xl"} onClose={() => dispatch(closeModal())}>
      <Modal.Header/>
      <Modal.Body>
        <div className="modalBody space-y-8">
          <div className={"text-2xl"}>
            Account Settings
          </div>
          <div className={"text-lg font-semibold"}>
            Login Providers
            <hr/>
          </div>
          <div className={"space-y-8"}>
            <GoogleProviderSettings/>
            <EmailProviderSettings/>
          </div>

          <div className={"text-lg font-semibold"}>
            Password
            <hr/>
          </div>
          <PasswordSettings/>
        </div>
      </Modal.Body>
    </Modal>
  )
}