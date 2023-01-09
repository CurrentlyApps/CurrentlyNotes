import {useState} from "react";
import {Button, Checkbox, Label, Spinner, TextInput} from "flowbite-react";
import authService from "services/firebaseAuthService";

export default function SignIn({setIsLoginScreen}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const signInWithPasswordClick = () => {
    setIsLoading(true);
    authService.signInWithPassword(email, password, () => {
      setIsLoading(false);
    }, (error) => {
      if (
        error.code === 'auth/wrong-password'
        || error.code === 'auth/user-not-found'
        || error.code === 'auth/invalid-email'
      ) {
        setError('Check your email and password and try again.');
      } else {
        setError(error.code );
      }
      setIsLoading(false);
    });
  }

  const signInWithGoogleClick = () => {
    setIsLoadingGoogle(true);
    authService.signInWithGoogle(() => {
      setIsLoadingGoogle(false);
    }, (error) => {
      setError(error.code);
      setIsLoadingGoogle(false);
    });
  }

  return (
    <>
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
        <Button onClick={ signInWithPasswordClick } >
          {
            isLoading ?
              <Spinner className="w-5 h-5 text-white" />
              :
              <span className={"pl-3"}>Log in to your account</span>
          }
        </Button>
      </div>
      <div className={"w-full text-center"}>
        Or
      </div>
      <Button color="light" className={"btn p-2 btn-primary mx-auto"} onClick={() => signInWithGoogleClick()}>
        <div className={"flex flex-row "}>
          {
            isLoadingGoogle ?
              <Spinner className="w-5 h-5 text-white" />
              :
              <>
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" className="w-6 h-6 mr-2" alt="Google Logo"/>
                Sign In with Google
              </>
          }
        </div>
      </Button>
      <button className="w-full text-center text-sm text-blue-700 hover:underline dark:text-blue-500" onClick={() => setIsLoginScreen(false)}>
        Need an account? Register here!
      </button>
    </>
  )
}