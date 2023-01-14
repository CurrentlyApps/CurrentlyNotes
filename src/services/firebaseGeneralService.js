import {onValue, ref, set, onDisconnect, push, serverTimestamp} from "firebase/database";
import {db} from "./firebase";
import store from "stores/store";
import {setIsOnline} from "stores/Auth/firebaseSlice";
import {getAuth} from "firebase/auth";


const firebaseGeneralService = {
  detectOnlineStatus: () => {
    let user = getAuth().currentUser
    const userLastOnlineRef = ref(db, `users/${user.uid}/lastOnline`);
    const userConnectionRef = ref(db, `users/${user.uid}/connections`);
    const connectedRef = ref(db, ".info/connected");

    onValue(connectedRef, (snapshot) => {
      if (snapshot.val() === true) {
        const con = push(userConnectionRef);
        onDisconnect(con).remove();
        set(con, serverTimestamp());
        onDisconnect(userLastOnlineRef).set(serverTimestamp());
        store.dispatch(setIsOnline(true));
      } else {
        store.dispatch(setIsOnline(false));
      }
    });
  }
}

export default firebaseGeneralService;