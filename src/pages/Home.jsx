import SidePanel from "components/SidePanel/SidePanel";
import Editor from "components/Editor/Editor";
import Statusbar from "components/Statusbar/Statusbar";
import React, { useState, useEffect, createContext } from 'react';
import { onAuthStateChanged } from "services/firebase";
import { AppContext } from "contexts/AppContext";


function Home() {
  const [currentNote, setCurrentNote] = useState(null);
  const [noteList, setNoteState] = useState({});
  const [user, setUserState] = useState(null);
  const [editState, setEditState] = useState(false);
  const [extended, setExtendedState] = useState(true);
  const [modalShareActive, setModalShareActive] = useState(false);
  
  const context = {
      user: user,
      noteList: noteList,
      currentNote: currentNote,
      editState: editState,
      extended: extended,
      modalShareActive: modalShareActive,
      setModalShareActive: setModalShareActive,
      setExtendedState: setExtendedState,
      setEditState: setEditState,
      setUserState: setUserState,
      setCurrentNote: setCurrentNote,
      setNoteState: setNoteState
  }

  useEffect(() => {
    onAuthStateChanged(context);
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