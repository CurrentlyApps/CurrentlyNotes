import {useEffect} from "react";
import {getAuth} from "firebase/auth";
import {logout} from "stores/Auth/authSlice";
import {useDispatch} from "react-redux";
import authService from "services/firebaseAuthService";
import {openModal} from "stores/UI/uiModals";
import firebaseAuthService from "services/firebaseAuthService";
export default function UserStateManager() {
  const dispatch = useDispatch();

  useEffect(() => {
    getAuth().onAuthStateChanged(function(user) {
      if( user ) {
        authService.setUser(user);

        if (!user.emailVerified) {
          dispatch(openModal("RequireVerification"));
        }

        // Get provider type
        if (user.providerData[0].providerId === "password") {
          firebaseAuthService.handleVerifiedEmail();
        }
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);


}