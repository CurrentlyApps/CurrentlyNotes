import {Button, Label, Spinner, TextInput} from "flowbite-react";
import {useState} from "react";
import authService from "services/firebaseAuthService";

export default function Register({setIsLoginScreen}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createPasswordAccount = () => {
    setIsLoading(true);
    authService.createPasswordAccount(email, password, ()=> {
      setIsLoading(false);
    }, (error) => {
      setError(error.message);
      setIsLoading(false);
    });
  }

  return (
    <>
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        Register to Currently Notes
      </h3>
      {error && <p className="text-red-500 text-sm">{error}</p>}
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
          type={"password"}
          required={true}
          value={password}
          onChange={ (e) => {setPassword(e.target.value)} }
        />
      </div>
      <div>
        <div className="mb-2 block">
          {
            password !== verifyPassword &&
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
          value={verifyPassword}
          onChange={ (e) => {setVerifyPassword(e.target.value)} }
        />
      </div>
      <div className="w-full">
        <Button
          disabled={password !== verifyPassword || password === "" || isLoading}
          onClick={ createPasswordAccount } >
          {
            isLoading ?
              <Spinner className="w-5 h-5 text-white" />
              :
              <span className={"pl-3"}>Create a Currently Account!</span>
          }
        </Button>
      </div>
      <button className="w-full text-center text-sm text-blue-700 hover:underline dark:text-blue-500" onClick={() => setIsLoginScreen(true)}>
        Already have an account? Sign in here!
      </button>
    </>
  )
}