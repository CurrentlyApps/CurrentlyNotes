import {useEffect} from "react";
import {getAuth} from "firebase/auth";
import {onValue, ref, set, get, child} from "firebase/database";
import {db} from "services/firebase";
import {logout} from "stores/Auth/authSlice";
import {useDispatch} from "react-redux";
import {setNotes} from "stores/Notes/notesSlice";
import authService from "services/firebaseAuthService";
import {openModal} from "stores/UI/uiModals";
export default function UserStateManager() {
  const dispatch = useDispatch();

  useEffect(() => {
    getAuth().onAuthStateChanged(function(user) {
      if( user ) {
        authService.setUser(user);

        if (!user.emailVerified) {
          dispatch(openModal("RequireVerification"));
        }

        const dbRef = ref(db);
        get(child(dbRef, `/notes/users/${user.uid}/profile/emailVerified`)).then((snapshot) => {
          let emailVerified = snapshot.val();
          if (emailVerified != null) {
            if (!emailVerified && user.emailVerified) {
              set(ref(db, `/notes/users/${user.uid}/profile/emailVerified`), true);
            }
          }
        });

        const notesRef = ref(db, `/notes/users/${user.uid}/notes`);
        onValue(notesRef, (snapshot) => {
          let data = snapshot.val();
          dispatch(setNotes(data));
        });
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);


}