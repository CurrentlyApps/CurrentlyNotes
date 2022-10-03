import SidePanel from "./SidePanel/SidePanel";
import Editor from "./Editor/Editor";
import React, { useState, useEffect, createContext } from 'react';
import { getDatabase, ref, onValue, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";


// Firebase
const firebaseConfig = {
  
};

const app = initializeApp(firebaseConfig);



// Context
export const AppContext = createContext()

function Home() {
  const [currentNote, setCurrentNote] = useState(null)
  const [noteList, setNoteState] = useState({});
  const [user, setUserState] = useState(null)

  const context = {
    firebase: app,
    user: user,
    setUserState: setUserState,
    setCurrentNote: setCurrentNote
  }

  useEffect(() => {
    getAuth().onAuthStateChanged(function(user) {
      if( user ) {
        context.setUserState(user);
        const db = getDatabase(app);
        const notesRef = ref(db, `/notes/users/${user.uid}/notes`);
        onValue(notesRef, (snapshot) => {
          const data = snapshot.val();
          if( !data ){
            setNoteState([])
          } else {
            setNoteState(data);
          }
        });
      } else {
        context.setUserState(null);
      }
    });
    
  }, []);

  const noteClicked = function(id) {
    setCurrentNote(id)
  }

  const newNoteClicked = function() {
    const db = getDatabase(context.app);
    const notesRef = ref(db, `notes/users/${context.user.uid}/notes`);
    
    let newId = Object.keys(noteList).length + 1;
    let tempState = { ...noteList }
    tempState[newId] = {
      id: newId,
      title: "New Note",
      body: ""
    }
    set(notesRef, tempState).then( () => setCurrentNote(newId))
  }

  const updateNote = function(note){
    const db = getDatabase(context.app);
    const notesRef = ref(db, `notes/users/${context.user.uid}/notes/${note.id}`);
    set(notesRef, note)
  } 

  return (
    <AppContext.Provider value={context}>
      <div className="w-screen h-screen flex flex-row">
        <SidePanel notes={ noteList } noteClicked={ noteClicked } newNoteClicked={ newNoteClicked } currentNote={ currentNote } />
        {
          currentNote === null
          ? <div className="container mx-auto px-96 pt-10 text-center text-zinc-500"> Select a note on the left, or create a new one! </div>
          : <Editor note={ noteList[currentNote] } updateNote={ updateNote }/>
        }
      </div>
    </AppContext.Provider>
  );
}

export default Home;