import { initializeApp } from "firebase/app";
import { set, getDatabase, ref, push } from "firebase/database";
import { getAnalytics, logEvent } from "firebase/analytics";
import store from "stores/store";

export const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getDatabase(app);


export const newNoteClicked = function() {
    let user = store.getState().auth;
    logEvent(analytics, 'note_added');
    const notesRef = ref(db, `notes/users/${user.uid}/notes`);
    const newNoteRef = push(notesRef);
    set(newNoteRef, {
        id: newNoteRef.key,
        title: "Untitled Note",
        body: "",
        privacy: "private"
    })
}
