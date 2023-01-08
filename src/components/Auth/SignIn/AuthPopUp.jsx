import {Modal} from "flowbite-react";
import { useState} from "react";
import { useSelector} from "react-redux";
import SignIn from "./SignIn";
import Register from "./Register";

export default function AuthPopUp ({visible, setVisible}) {

  const isSignedIn = useSelector((state) => state.auth.isSignedIn);

  const [isLoginScreen, setIsLoginScreen] = useState(true);

  const screenRender = () => {
    if (isLoginScreen) {
      return (<SignIn setIsLoginScreen={setIsLoginScreen}/>)
    } else {
      return (<Register setIsLoginScreen={setIsLoginScreen}/>)
    }
  }

  return (
    <Modal
      show={visible || !isSignedIn}
      size={"md"}
      popup={true}
      onClose={ () => {setVisible(false)} }
    >
      <Modal.Body>
        <div className="pt-10 space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          {screenRender()}
        </div>
      </Modal.Body>
    </Modal>

  )
}