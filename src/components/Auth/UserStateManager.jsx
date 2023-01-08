import {useEffect} from "react";
import {getAuth} from "firebase/auth";
import {onValue, ref} from "firebase/database";
import {db} from "../../services/firebase";
import {logout, setUserData} from "../../stores/Auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setNotes} from "../../stores/Notes/notesSlice";

export default function UserStateManager() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector(state => state.auth);

  useEffect(() => {
    getAuth().onAuthStateChanged(function(user) {
      if( user ) {
        // Set User Information
        dispatch(setUserData({
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid
        }));

        // Set User Notes
        const notesRef = ref(db, `/notes/users/${user.uid}/notes`);
        onValue(notesRef, (snapshot) => {
          let data = snapshot.val();
          dispatch(setNotes(data));
        });
      } else {
        dispatch(logout());
      }
    });
  });

  useEffect(() => {
    if ( user.isSignedIn == null ) {
      navigate("/");
    }
  }, [navigate, user.isSignedIn]);
}