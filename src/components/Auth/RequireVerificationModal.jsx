import {Button, Modal, Spinner} from "flowbite-react";
import authService from "../../services/firebaseAuthService";
import {useState} from "react";


export default function RequireVerificationModal() {
  const [isLoading, setIsLoading] = useState(false);
  const handleResendVerificationEmail = () => {
    setIsLoading(true);
    authService.sendVerificationEmail(() => {
      setIsLoading(false);
    });
  }

  return (
    <Modal show={true} popup={true} >
      <Modal.Body>
        <div className={"text-center pt-8"}>
          <div className={"text-2xl font-bold mb-4"}>
            Please verify your email
          </div>
          <div className={"mb-4"}>
            We've sent you an email with a link to verify your email address. Please click the link in the email to verify your email address.
          </div>
          <div className={"mb-4"}>
            If you don't see the email, please check your spam folder.
          </div>
          <div className={"mb-4 space-y-4"}>
            <Button
              onClick={() => { handleResendVerificationEmail() }}
              color={"light"}>
              {
                isLoading ?
                  <Spinner/> :
                  "Resend verification email"
              }
            </Button>
            <Button  onClick={() => { authService.signOut() }}
              >
              {
                isLoading ?
                  <Spinner/> :
                  "Sign out"
              }
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}