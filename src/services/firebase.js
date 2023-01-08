import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { set, getDatabase, ref, push, remove } from "firebase/database";
import { getAnalytics, logEvent } from "firebase/analytics";
import store from "stores/store";
import {logout, setUserData} from "../stores/Auth/authSlice";

const firebaseConfig = {
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

const auth = getAuth();
const provider = new GoogleAuthProvider();
export const db = getDatabase(app);

export const signOutClick = function() {
    logEvent(analytics, 'signed_out');

    signOut(auth).then(() => {
        store.dispatch(logout());
    });
}

export const signInWithGoogle = function() {
    logEvent(analytics, 'signed_in');
    signInWithPopup(auth, provider)
        .then((result) => {
            store.dispatch(setUserData({
                displayName: result.user.displayName,
                photoURL: result.user.photoURL,
                email: result.user.email,
                uid: result.user.uid
            }));
            updateProfile();
        }).catch((error) => {
            console.log(error)
        }
    );
}

export const deleteNote = function(noteId) {
    let user = store.getState().auth;
    const notesRef = ref(db, `/notes/users/${user.uid}/notes/${noteId}`);
    remove(notesRef)
    logEvent(analytics, 'note_deleted');
}

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

export const updateNote = function(note, user_id){
    const notesRef = ref(db, `notes/users/${user_id}/notes/${note.id}`);
    set(notesRef, note)
  }

export const updateProfile = function() {
    const user = getAuth().currentUser;
    const userRef = ref(db, `notes/users/${user.uid}/profile`)
    set(userRef, {
        displayName: user.displayName,
        email: user.email
    });
}
