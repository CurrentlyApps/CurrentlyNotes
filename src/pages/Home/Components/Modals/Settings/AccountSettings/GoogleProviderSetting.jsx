import {Button, Tooltip} from "flowbite-react";
import {getAuth} from "firebase/auth";
import {QuestionMarkCircleIcon} from "@heroicons/react/24/outline";

export default function GoogleProviderSettings() {
  const authUser = getAuth().currentUser;
  const googleIsProvider = authUser.providerData.some((provider) => {
    return provider.providerId === "google.com";
  });
  return (
    <div>
      <div className={"flex flex-row"}>
        <div className={"flex flex-row "}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" className="w-12 h-12 mr-2" alt="Google Logo"/>
          <div className={"flex flex-col ml-4"}>
            {
              googleIsProvider ?
                authUser.email
                :
                "Not Linked"
            }
            <Tooltip
              content={"Connect your Google account to allow login using Google"}>
              <div className={"flex flex-row text-zinc-500"}>
                <div>
                  Google
                </div>
                <QuestionMarkCircleIcon className={"h-5 my-auto ml-1"}/>
              </div>
            </Tooltip>
          </div>
        </div>
        <div className={"flex flex-row ml-auto my-auto"}>
          {
            googleIsProvider ?
              <Button disabled={true} color={"light"}>Connected</Button>
              :
              <Button disabled={true} color={"light"}>Connect Google Account</Button>
          }
        </div>
      </div>
    </div>
  )
}