import {getAuth} from "firebase/auth";
import {Button, Spinner} from "flowbite-react";
import authService from "services/firebaseAuthService";
import {useState} from "react";

export default function PasswordSettings ()  {
  const authUser = getAuth().currentUser;
  const [isLoading, setIsLoading] = useState(false);
  const [confirmEmailSent, setConfirmEmailSent] = useState(false);
  const hasPassword = authUser.providerData.some((provider) => {
    return provider.providerId === "password";
  });

  const handleRequestPasswordChange = () => {
    setIsLoading(true);
    authService.requestPasswordReset(() => {
      setIsLoading(false);
      setConfirmEmailSent(true);
    }, (error) => {
      setIsLoading(false);
      console.log(error);
    });
  }

  if (hasPassword) {
    return (
      <Button
        onClick={() => { handleRequestPasswordChange() }}
        disabled={confirmEmailSent}
        color={"light"}>
        {
          isLoading ?
            <Spinner/>
            :
            confirmEmailSent ? "Email Sent" : "Request Password Change"
        }
      </Button>
    )
  }

  return (
    <div className={"text-center"}>
      You don't have a password connected, connect to the Email and Password login provider above to allow password settings.
    </div>
  )
}