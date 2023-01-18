import {child, get, getDatabase, ref} from "firebase/database";
import {getAuth} from "firebase/auth";
import {getFunctions, httpsCallable} from "firebase/functions";


const FirebaseSharingService = {

  getSharedWithUser: (setSharedNotes) => {
    const user = getAuth().currentUser;
    const dbRef = ref(getDatabase());

    get(child(dbRef, `/notes_share/user/${user.uid}/`)).then((snapshot) => {
      const sharedToUserUsers = snapshot.val();
      if (sharedToUserUsers) {
        Object.keys(sharedToUserUsers).forEach((userId) => {
          Object.keys(sharedToUserUsers[userId]).forEach((noteId) => {
            get(child(dbRef, `/notes_meta/${userId}/${noteId}`)).then((snapshot) => {
              const note_meta = snapshot.val();
              note_meta["shared_info"] = sharedToUserUsers[userId][noteId];
              if (note_meta) {
                setSharedNotes(prev => [...prev, note_meta]);
              }
            });
          });
        });
      }
    });
  },

  getNoteShareOptions : (note, callback) => {
    get(child(ref(getDatabase()), `/notes_share/notes/${note.user_id}/${note.id}`)).then((snapshot) => {
      if(!snapshot.exists()) {
        FirebaseSharingService.updateNoteShareSettings({
          canCollab: false,
          canPublish: false,
          allowPublishPublic: true,
          allowCollabPublic: false,
          noteMeta: note
        }, () => {
          FirebaseSharingService.getNoteShareOptions(note, callback);
        });
      } else {
        callback(snapshot.val());
      }
    });
  },

  updateNoteShareSettings : (data, callback) => {
    const functions = getFunctions();
    const shareNoteToUser = httpsCallable(functions, 'shareNoteToUser');
    shareNoteToUser(data).then((result) => {
      callback(result.data);
    });
  }
}

export default FirebaseSharingService;