import {getAuth} from "firebase/auth";

export default function PasswordSettings ()  {
  const authUser = getAuth().currentUser;
  const hasPassword = authUser.providerData.some((provider) => {
    return provider.providerId === "password";
  });

  if (hasPassword) {
    return (
      <div>
        Has password!
      </div>
    )
  }

  return (
    <div className={"text-center"}>
      You don't have a password connected, connect to the Email and Password login provider above to allow password settings.
    </div>
  )
}