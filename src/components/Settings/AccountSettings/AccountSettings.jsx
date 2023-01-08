import {Button, Modal, TextInput} from "flowbite-react";
import {EmailAuthProvider, getAuth, linkWithCredential} from "firebase/auth";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {closeModal} from "../../../stores/UI/uiModals";

export default function AccountSettings() {
  const dispatch = useDispatch();
  const userData = getAuth().currentUser;

  const email = userData.email;
  const [password, setPassword] = useState("");
  const linkAccount = () => {
    const credential = EmailAuthProvider.credential(email, password);
    const auth = getAuth();
    linkWithCredential(auth.currentUser, credential).then((usercred) => {
      console.log(usercred);
    }).catch((error) => {
      console.log(error);
    });


  }

  return (
    <Modal show={true} size={"3xl"} onClose={() => dispatch(closeModal())}>
      <Modal.Header>
        Account Settings
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-4">
          <div className={"text-lg font-semibold"}>
            Login Providers
          </div>
          <hr/>
          <div>
            Set Password
            {password}
            <TextInput type={"password"}  placeholder={"Password"} onChange={ (e) => {setPassword(e.target.value)}}/>
            <Button onClick={() => linkAccount()} >Set Password</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}