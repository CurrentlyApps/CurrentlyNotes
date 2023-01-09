import {Button, Label, Modal, Spinner, TextInput} from "flowbite-react";
import {useState} from "react";
import {getAuth} from "firebase/auth";
import authService from "../../../services/firebaseAuthService";


export default function EmailProviderSettingsAddPassword ({isVisible, setIsVisible}) {

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = getAuth().currentUser;

  const handleAddPassword = () => {
    setIsLoading(true);
    authService.linkEmailPassword(user, password, () => {
      setIsLoading(false);
      setIsVisible(false);
    }, (error) => {
      setIsLoading(false);
      setError(error);
      console.log(error);
    });
  }

  return (
    <Modal
      onClose={() => setIsVisible(false)}
      popup={true}
      show={isVisible}
      size={"lg"}>
      <Modal.Header/>
      <Modal.Body>
        <div className="modalBody space-y-8">
          <div>
            <div className={"text-2xl"}>
              Add a password
            </div>
            <hr/>
          </div>
          {
            error ?
              <div className={"text-red-500"}>
                {error}
              </div>
              :
              null
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
              disabled={true}
              required={true}
              value={user.email}
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
              type={"password"}
              required={true}
              value={password}
              onChange={ (e) => {setPassword(e.target.value)} }
            />
          </div>
          <div>
            <div className="mb-2 block">
              {
                password !== passwordConfirm &&
                <p className="text-red-500 text-sm">Passwords do not match</p>
              }

              <Label
                htmlFor="verify"
                value="Verify password"
              />
            </div>
            <TextInput
              id="verify"
              type={"password"}
              required={true}
              value={passwordConfirm}
              onChange={ (e) => {setPasswordConfirm(e.target.value)} }
            />
          </div>
          <div className="w-full">
            <Button onClick={handleAddPassword} disabled={password !== passwordConfirm || password === "" || isLoading}>
              {
                isLoading ?
                  <Spinner className="w-5 h-5 text-white" />
                  :
                  <span className={"pl-3"}>Add Password</span>
              }
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}