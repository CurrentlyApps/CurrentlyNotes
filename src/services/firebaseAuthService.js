import {
  createUserWithEmailAndPassword, EmailAuthProvider,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  linkWithCredential,
  signInWithPopup,
  sendEmailVerification,
  signOut,
  deleteUser,
  sendPasswordResetEmail,
  unlink
} from "firebase/auth";
import {logout, setUserData} from "../stores/Auth/authSlice";
import store from "stores/store";
import {setNote, setNotes} from "../stores/Notes/notesSlice";

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
      sendEmailVerification(userCredential.user);
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
      store.dispatch(setNotes([]));
      store.dispatch(setNote(null))
      store.dispatch(logout());
    });
  },

  signInWithGoogle : (res, err) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        res();
        authService.setUser(result.user);
      }).catch((error) => {
        err(error);
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
  },

  linkEmailPassword : (email, password, res, err) => {
    const originalUID = auth.currentUser.uid;
    linkWithCredential(auth.currentUser, EmailAuthProvider.credential(email, password)).then((usercred) => {
      authService.setUser(usercred.user);
      res();
    }).catch((error) => {
      if (error.code === 'auth/requires-recent-login') {
        signInWithPopup(auth, provider)
          .then((result) => {
            if (result.user.uid === originalUID) {
              authService.linkEmailPassword(email, password, res, err);
            }

          }).catch((error) => {
            err(error);
          }
        );
      }
    });
  },

  requestPasswordReset(res, err) {
    sendPasswordResetEmail(auth, auth.currentUser.email).then(() => {
      res();
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      err(error);
    });
  },

  requestDeleteAccount (res) {
    const originalUID = auth.currentUser.uid;

    deleteUser(auth.currentUser).then(() => {
      res();
      authService.signOut();
    }).catch((error) => {
      if (error.code === 'auth/requires-recent-login') {
        signInWithPopup(auth, provider)
          .then((result) => {
            if (result.user.uid === originalUID) {
              authService.requestDeleteAccount();
            }
          }).catch((error) => {
            console.log(error)
          }
        );
      }
    });
  },

  devOnlyUnlinkEmailProvider : (res, err) => {
    const user = auth.currentUser;
    unlink(user, 'password').then(() => {
      res();
    }).catch((error) => {
      err(error);
    });
  }
}

export default authService;
