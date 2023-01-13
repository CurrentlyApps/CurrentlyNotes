import {useEffect, useState} from "react";
import {getAuth} from "firebase/auth";
import firebaseNotesService from "services/firebaseNotesService";
import NoteListEntry from "./NoteListEntry";
import {useSelector} from "react-redux";
import {Spinner} from "flowbite-react";


export default function NoteList() {

  let [loading, setLoading] = useState(true);
  let all_notes = useSelector(state => state.notes.notes);

  useEffect(() => {
    getAuth().onAuthStateChanged(function(user) {
      if( user ) {
        setLoading(true);
        firebaseNotesService.getNotesList()
      }
    });
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [all_notes]);


  if (loading) {
    return (
      <div className={"w-full mt-20 text-center"}>
        <Spinner size={"xl"}/>
        <div className={"text-zinc-500 mt-5"}>
          Loading your notes...
        </div>
      </div>
    )
  }

  return (
    <div>
      {
        all_notes
          ?
          NoteEntryList(all_notes)
          :
          <div className={"w-full mt-20 text-center"}>
            <div className={"text-zinc-500 mt-5"}>
              You have no notes yet.
            </div>
          </div>
      }
    </div>
  )
}

function NoteEntryList(list) {
  let listElement = [];
  Object.values(list).forEach(note => {
    listElement.push(
      <NoteListEntry key={note.id} note={note} />
    )
  });
  return listElement
}