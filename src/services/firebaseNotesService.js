import {
  onValue,
  update,
  ref,
  remove,
  set,
  serverTimestamp,
  push,
  child
} from "firebase/database";
import {db} from "./firebase";
import {setNoteContent, setNoteMeta, setNotes} from "stores/Notes/notesSlice";
import store from "stores/store";
import {setIsSavingData} from "stores/UI/uiSlice";


const firebaseNotesService = {
  getNotesList : () => {
    let user = store.getState().auth;
    const notesRef = ref(db, `/notes_meta/${user.uid}/`);
    onValue(notesRef, (snapshot) => {
      let data = snapshot.val();
      if( data ) {
        store.dispatch(setNotes(data));
      } else {
        store.dispatch(setNotes([]));
      }
    });
  },

  getNoteMeta : (userId, noteId) => {
    const noteRef = ref(db, `/notes_meta/${userId}/${noteId}`);
    onValue(noteRef, (snapshot) => {
      let data = snapshot.val();
      if( data ) {
        store.dispatch(setNoteMeta(data));
      } else {
        store.dispatch(setNoteMeta({}));
      }
    });
  },

  getNoteContent : (userId, noteId) => {
    const noteRef = ref(db, `/notes_content/${userId}/${noteId}`);
    onValue(noteRef, (snapshot) => {
      let data = snapshot.val();
      console.log(data)
      if( data ) {
        store.dispatch(setNoteContent(data));
      } else {
        store.dispatch(setNoteContent({}));
      }
    });
  },

  updateNoteMeta : (note) => {
    const notesRef = ref(db, `/notes_meta/${note.user_id}/${note.id}`);

    store.dispatch(setIsSavingData(true));
    set(notesRef, note).then(() => {
      store.dispatch(setIsSavingData(false));
    });
  },

  updateNoteContent : (note) => {
    const noteRef = ref(db, `notes_content/${note.user_id}/${note.id}`);

    store.dispatch(setIsSavingData(true));
    set(noteRef, note).then(() => {
      store.dispatch(setIsSavingData(false));
    });
  },

  deleteNote : (note) => {
    const noteRef = ref(db, `/notes/users/${note.user_id}/notes/${note.id}`);

    store.dispatch(setIsSavingData(true));
    remove(noteRef).then(() => {
      store.dispatch(setIsSavingData(false));
    });
  },

  createNote : () => {
    let user = store.getState().auth;
    const newNoteKey = push(child(ref(db), `notes_meta/${user.uid}`)).key;
    const updates = {}

    updates[`notes_meta/${user.uid}/${newNoteKey}`] = {
      id: newNoteKey,
      user_id: user.uid,
      title: "New Note",
      created_at: serverTimestamp(),
      updated_at: serverTimestamp(),
      privacy: "private",
    }

    updates[`notes_content/${user.uid}/${newNoteKey}`] = {
      id: newNoteKey,
      user_id: user.uid,
      body: "This is a sample note. You can edit it by clicking on it." +
        " You can also delete it by clicking the trash can icon next to the" +
        " note in the sidebar. To create a new note, just hit the new note " +
        "icon at the top of the sidebar! For help in formatting, check out " +
        "the link above.",
    }



    store.dispatch(setIsSavingData(true));
    update(ref(db), updates).then(() => {
      store.dispatch(setIsSavingData(false));
    });
  }
}

export default firebaseNotesService;