import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import {logout, setUserData} from "../stores/Auth/authSlice";
import store from "stores/store";
import {logEvent} from "firebase/analytics";
import {analytics} from "./firebase";
import {setNote} from "../stores/Notes/notesSlice";

const auth = getAuth();
const provider = new GoogleAuthProvider();

const authService = {
  setUser : (user) => {
    store.dispatch(setUserData({
      displayName: user.displayName ? user.displayName : user.email,
      photoURL: user.photoURL ? user.photoURL : 'https://api.dicebear.com/5.x/avataaars-neutral/svg?seed=' + user.uid,
      email: user.email,
      uid: user.uid
    }));
  },

  createPasswordAccount : (email, password, res, err) => {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      authService.setUser(userCredential.user);
      res();
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      err(errorCode, errorMessage);
    });
  },

  signOut : () => {
    signOut(auth).then(() => {
      document.title = "Currently Notes";
      store.dispatch(setNote(null))
      store.dispatch(logout());
    });
  },

  signInWithGoogle : () => {
    logEvent(analytics, 'signed_in');
    signInWithPopup(auth, provider)
      .then((result) => {
        authService.setUser(result.user);
      }).catch((error) => {
        console.log(error)
      }
    );
  },

  signInWithPassword : (email, password, res, err) => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      authService.setUser(userCredential.user);
      return true;
    }).catch((error) => {
      err(error);
    });
  }
}

export default authService;
