import {Button, Modal, Spinner} from "flowbite-react";
import {useState} from "react";
import authService from "../../../services/firebaseAuthService";


export default function DangerZoneSettings () {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [messageIteration, setMessageIteration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const confirmMessages = [
    {
      title: "Are you sure?",
      message: "Your account and all of your data will be deleted. This action cannot be undone.",
      button: "Delete Account"
    },
    {
      title: "Are you really sure?",
      message: "This is gonna be pretty permanent. You will not be able to recover your data.",
      button: "Yes I'm Sure"
    },
  ]

  const requestDelete = () => {
    setIsLoading(true);
    authService.requestDeleteAccount(() => {
      closeConfirmModal();
    });
  }
  const closeConfirmModal = () => {
    setConfirmDelete(false);
    setMessageIteration(0);
    setIsLoading(false);
  }

  return (
    <>
      <Modal popup={true} show={confirmDelete} size={"xl"} onClose={() => closeConfirmModal()}>
        <Modal.Header/>
        <Modal.Body>
          <div className={"modalBody space-y-8"}>
            <div className={"text-2xl"}>
              {confirmMessages[messageIteration].title}
            </div>
            <div className={"text-lg"}>
              {confirmMessages[messageIteration].message}
            </div>
            <div className={"space-y-2"}>
              <Button
                color={"light"}
                onClick={() => closeConfirmModal()}
              >
                I change my mind, take me back
              </Button>
              <Button
                color={"failure"}
                onClick={() => {
                  if (messageIteration < confirmMessages.length - 1) {
                    setMessageIteration(messageIteration + 1);
                  } else {
                    requestDelete();
                  }
                }}>
                {
                  isLoading ?
                    <Spinner/>
                    :
                    confirmMessages[messageIteration].button
                }
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Button color={"failure"} onClick={() => setConfirmDelete(true)}>
        Delete Account
      </Button>
    </>
  )
}