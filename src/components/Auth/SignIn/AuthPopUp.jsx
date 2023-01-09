import {Modal} from "flowbite-react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SignIn from "./SignIn";
import Register from "./Register";
import {closeModal, openModal} from "../../../stores/UI/uiModals";

export default function AuthPopUp () {

  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const user = useSelector(state => state.auth);
  const currentOpenModal = useSelector(state => state.uiModal.modal);
  const dispatch = useDispatch();

  useEffect( () => {
    if (user.isSignedIn && currentOpenModal === "Login") {
      dispatch(closeModal());
    } else if (!user.isSignedIn && currentOpenModal !== "Login") {
      dispatch(openModal("Login"));
    }
  }, [dispatch, user.isSignedIn, currentOpenModal]);

  const screenRender = () => {
    if (isLoginScreen) {
      return (<SignIn setIsLoginScreen={setIsLoginScreen}/>)
    } else {
      return (<Register setIsLoginScreen={setIsLoginScreen}/>)
    }
  }

  return (
    <Modal
      show={true}
      size={"md"}
      popup={true}

    >
      <Modal.Body>
        <div className="pt-10 space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          {screenRender()}
        </div>
      </Modal.Body>
    </Modal>

  )
}