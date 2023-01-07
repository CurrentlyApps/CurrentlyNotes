import SidePanel from "components/SidePanel/SidePanel";
import Statusbar from "components/Statusbar/Statusbar";
import React, { useState, useEffect } from 'react';
import { db } from "services/firebase";
import { AppContext } from "contexts/AppContext";
import { onValue, ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import {Outlet, useNavigate} from "react-router-dom";


function Home() {
  let navigate = useNavigate();

  const [currentNote, setCurrentNote] = useState(null);
  const [note, setNote] = useState(null);
  const [noteList, setNoteState] = useState({});
  const [user, setUserState] = useState(null);
  const [editState, setEditState] = useState(true);
  const [extended, setExtendedState] = useState(true);
  const [modalShareNote, setModalShareNote] = useState(null);
  const [loadingNotes, setLoadingNotes] = useState(true);
  
  const context = {
    user: user,
    noteList: noteList,
    currentNote: currentNote,
    note: note,
    setNote: setNote,
    editState: editState,
    extended: extended,
    modalShareNote: modalShareNote,
    loadingNotes: loadingNotes,
    setLoadingNotes: setLoadingNotes,
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
            setLoadingNotes(false)
        });
      } else {
        setUserState(null);
      }
    });
  }, []);

  useEffect(() => {
    if ( user == null ) {
      navigate("/");
    }
  }, [navigate, user]);



  return (
    <AppContext.Provider value={context}>
      <div className="flex flex-col w-screen h-screen overflow-hidden">
        <Statusbar/>
        <div className="flex flex-row h-screen overflow-auto">
          <SidePanel />
          <Outlet />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default Home;