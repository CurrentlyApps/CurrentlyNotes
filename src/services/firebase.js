import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { set, getDatabase, ref } from "firebase/database";

const firebaseConfig = {
    
};
  
export const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getDatabase(app);


export const signOutClick = function(context) {    
    signOut(auth);
    context.setUserState( null );
    context.setCurrentNote( null );
}

export const signIn = function(context) {
    signInWithPopup(auth, provider)
        .then((result) => {
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            context.setUserState(result.user);
        }).catch((error) => {
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // const email = error.customData.email;
            // const credential = GoogleAuthProvider.credentialFromError(error);
        }
    );
}

export const deleteNote = function(noteId, context) {
    
    const notesRef = ref(db, `/notes/users/${context.user.uid}/notes/${noteId}`);
    context.setCurrentNote(null);
    set(notesRef, null);
}

export const newNoteClicked = function(context) {
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