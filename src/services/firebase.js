import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { set, getDatabase, ref, get } from "firebase/database";
import { getAnalytics, logEvent } from "firebase/analytics";

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
const db = getDatabase(app);

export const signOutClick = function(context) {    
    logEvent(analytics, 'signed_out');
    signOut(auth);
    context.setUserState( null );
    context.setCurrentNote( null );
}

export const signIn = function(context) {
    logEvent(analytics, 'signed_in');
    signInWithPopup(auth, provider)
        .then((result) => {
            context.setUserState(result.user);
            updateProfile();
        }).catch((error) => {
            console.log(error)
        }
    );
}

export const deleteNote = function(noteId, context) {
    const notesRef = ref(db, `/notes/users/${context.user.uid}/notes/${noteId}`);
    context.setCurrentNote(null);
    set(notesRef, null);
    logEvent(analytics, 'note_deleted');
}

export const newNoteClicked = function(context) {
    logEvent(analytics, 'note_added');
    const notesRef = ref(db, `notes/users/${context.user.uid}/notes`);
    let newId = Object.keys(context.noteList).length + 1;
    let tempState = { ...context.noteList }
    tempState[newId] = {
      id: newId,
      title: "New Note",
      body: ""
    }
    set(notesRef, tempState).then( () => context.setCurrentNote(newId))
}

export const updateNote = function(note, context){
    const notesRef = ref(db, `notes/users/${context.user.uid}/notes/${note.id}`);
    set(notesRef, note)
  }

export const getOneNote = function(userId, postId, setNoteState) {
    const notesRef = ref(db, `notes/users/${userId}/notes/${postId}`)
    get(notesRef).then( (snapshot ) => {
        console.log(snapshot.val())
        setNoteState(snapshot.val())
    });
}

export const updateProfile = function() {
    const user = getAuth().currentUser;
    const userRef = ref(db, `notes/users/${user.uid}/profile`)
    set(userRef, {
        displayName: user.displayName,
        email: user.email
    });
}