import {Modal, Spinner} from "flowbite-react";
import {useEffect, useState} from "react";
import SignIn from "./Components/SignIn";
import {getAuth} from "firebase/auth";
import { useNavigate, useOutlet} from "react-router-dom";
import Statusbar from "../Home/Components/Statusbar/Statusbar";

export default function AuthPage () {

  const outlet = useOutlet();
  const navigate = useNavigate();

  const [isCheckingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      } else {
        setCheckingAuth(false);
      }
    });
  });

  return (
    <>
      <Statusbar/>
      <Modal show={true}  size={"md"}  popup={true}>
        <Modal.Body>
          <div className="pt-10 modalBody text-center">
            {
              isCheckingAuth ? <Spinner/> : outlet ? outlet : <SignIn/>
            }
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}