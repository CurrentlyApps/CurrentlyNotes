
import { useEffect, useState} from "react";
import SignInOptions from "./SignIn/SignInOptions";
import { useSelector} from "react-redux";
export default function LoginOrProfile () {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const user = useSelector(state => state.auth);

  useEffect( () => {
    if (!user.isSignedIn) {
      setLoginModalOpen(false);
    }
  }, [user]);

  return (
      <>
        <SignInOptions visible={loginModalOpen} setVisible={setLoginModalOpen}/>
        {
          !user.isSignedIn
              ? <div className="cursor-pointer text-md py-2" onClick={ () => {setLoginModalOpen(true)} }> Login</div>
              : <div className="dropDown">
                <div className="flex flex-row">
                  <div className="hidden lg:block">{ user.displayName }</div>
                </div>
                <span className="block text-sm font-medium truncate">
                    { user.email }
                </span>
              </div>
        }
      </>
  )
}