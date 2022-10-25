import SidePanel from "components/SidePanel/SidePanel";
import Editor from "components/Editor/Editor";
import Statusbar from "components/Statusbar/Statusbar";
import React, { useState, useEffect } from 'react';
import { db } from "services/firebase";
import { AppContext } from "contexts/AppContext";
import { onValue, ref } from "firebase/database";
import { getAuth } from "firebase/auth";


function Home() {
  const [currentNote, setCurrentNote] = useState(null);
  const [noteList, setNoteState] = useState({});
  const [user, setUserState] = useState(null);
  const [editState, setEditState] = useState(false);
  const [extended, setExtendedState] = useState(true);
  const [modalShareNote, setModalShareNote] = useState(null);
  
  const context = {
      user: user,
      noteList: noteList,
      currentNote: currentNote,
      editState: editState,
      extended: extended,
      modalShareNote: modalShareNote,
      setModalShareNote: setModalShareNote,
      setExtendedState: setExtendedState,
      setEditState: setEditState,
      setUserState: setUserState,
      setCurrentNote: setCurrentNote,
      setNoteState: setNoteState
  }

  useEffect(() => {
    getAuth().onAuthStateChanged(function(user) {
      if( user ) {
        setUserState(user);
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