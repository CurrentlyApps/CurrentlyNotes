import {signInWithGoogle} from "../../services/firebase";
import {AppContext} from "contexts/AppContext";
import {useContext, useEffect, useState} from "react";
import SignInOptions from "./SignIn/SignInOptions";
export default function LoginOrProfile () {
  const context = useContext(AppContext);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect( () => {
    if (context.user != null) {
      setLoginModalOpen(false);
    }
  }, [context.user]);

  return (
      <>
        <SignInOptions visible={loginModalOpen} setVisible={setLoginModalOpen}/>
        {
          context.user == null
              ? <div className="cursor-pointer text-md py-2" onClick={ () => {setLoginModalOpen(true)} }> Login</div>
              : <div className="dropDown">
                <div className="flex flex-row">
                  <div className="hidden lg:block">{ context.user.displayName }</div>
                </div>
                <span className="block text-sm font-medium truncate">
                                { context.user.email }
                            </span>
              </div>
        }
      </>
  )
}