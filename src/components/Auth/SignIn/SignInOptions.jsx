import {Button, Checkbox, Label, Modal, TextInput} from "flowbite-react";
import {signInWithGoogle} from "services/firebase";
import {useContext, useState} from "react";
import {AppContext} from "contexts/AppContext";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

export default function SignInOptions ({visible, setVisible}) {
  const context = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const signIn = () => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          context.setUserState( user );
          return true;
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
            setError('Check your email and password and try again.');
          }
        });
  }

  return (
      <Modal
          show={visible || !context.user}
          size={"md"}
          popup={true}
          onClose={ () => {setVisible(false)} }
      >
        <Modal.Body>
          <div className="pt-10 space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to Currently Notes
            </h3>
            {
              error != null
                  ? <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 text-sm rounded relative" role="alert">
                    <span className="block sm:inline">{ error }</span>
                  </div>
                  : null
            }
            <div>
              <div className="mb-2 block">
                <Label
                    htmlFor="email"
                    value="Your email"
                />
              </div>
              <TextInput
                  id="email"
                  placeholder="name@company.com"
                  required={true}
                  value={email}
                  onChange={ (e) => {setEmail(e.target.value)} }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                    htmlFor="password"
                    value="Your password"
                />
              </div>
              <TextInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required={true}
                  value={password}
                  onChange={ (e) => {setPassword(e.target.value)} }
              />
            </div>
            <div className="flex justify-between">
              <div>
                <Checkbox
                    id="show-password"
                    checked={showPassword}
                    onChange={ () => {setShowPassword(!showPassword)} }
                />
                <Label htmlFor={"show-password"} > Show Password </Label>
              </div>
              <a
                  href="/modal"
                  className="text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
                Lost Password?
              </a>
            </div>
            <div className="w-full">
              <Button onClick={ signIn } >
                Log in to your account
              </Button>
            </div>
            <div className={"w-full text-center"}>
              Or
            </div>
            <Button color="light" className={"btn p-2 btn-primary mx-auto"} onClick={signInWithGoogle}>
              <div className={"flex flex-row "}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" className="w-6 h-6 mr-2" alt="Google Logo"/>
                Sign In with Google
              </div>
            </Button>
          </div>
        </Modal.Body>
      </Modal>
  )
}