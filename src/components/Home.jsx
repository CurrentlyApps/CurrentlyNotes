import SidePanel from "./SidePanel/SidePanel";
import Editor from "./Editor/Editor";
import Statusbar from "./Statusbar/Statusbar";
import React, { useState, useEffect, createContext } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../services/firebase";
import { getAuth } from "firebase/auth";



// Context
export const AppContext = createContext()

function Home() {
  const [currentNote, setCurrentNote] = useState(null);
  const [noteList, setNoteState] = useState({});
  const [user, setUserState] = useState(null);
  const [editState, setEditState] = useState(false);
  const [extended, setExtendedState] = useState(true)

  const context = {
    user: user,
    noteList: noteList,
    currentNote: currentNote,
    editState: editState,
    extended: extended,
    setExtendedState: setExtendedState,
    setEditState: setEditState,
    setUserState: setUserState,
    setCurrentNote: setCurrentNote
  }

  useEffect(() => {
    getAuth().onAuthStateChanged(function(user) {
      if( user ) {
        setUserState(user);
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
        setUserState(null);
      }
    });
    
  }, []);

  return (
    <AppContext.Provider value={context}>
      <div className="flex flex-col w-screen h-screen overflow-hidden">
        <Statusbar/>
        <div className="flex flex-row h-screen overflow-auto">
          <SidePanel />
          <Editor note={ noteList[currentNote] } />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default Home;