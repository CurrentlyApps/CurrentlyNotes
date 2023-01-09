import {Button, Tooltip} from "flowbite-react";
import {getAuth} from "firebase/auth";
import {QuestionMarkCircleIcon} from "@heroicons/react/24/outline";
import {EnvelopeIcon} from "@heroicons/react/24/outline";

export default function GoogleProviderSettings() {
  const authUser = getAuth().currentUser;
  const emailIsProvider = authUser.providerData.some((provider) => {
    return provider.providerId === "password";
  });
  return (
    <div>
      <div className={"flex flex-row"}>
        <div className={"flex flex-row "}>
          <EnvelopeIcon className="w-12 h-12 mr-2"/>
          <div className={"flex flex-col ml-4"}>
            {
              emailIsProvider ?
                authUser.email
                :
                "Not Linked"
            }
            <Tooltip
              content={"Adding a password login allows you to use the CLI app, as well as login via web using an Email and Password"}>
              <div className={"flex flex-row text-zinc-500"}>
                <div>
                  Email and Password
                </div>
                <QuestionMarkCircleIcon className={"h-5 my-auto ml-1"}/>
              </div>
            </Tooltip>
          </div>
        </div>
        <div className={"flex flex-row ml-auto my-auto"}>
          {
            emailIsProvider ?
              <div className={"text-green-500"}>
                <Button disabled={true} color={"light"}>Connected</Button>
              </div>
              :
              <Button >Add a password</Button>
          }
        </div>
      </div>
    </div>
  )
}