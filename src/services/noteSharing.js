import { get, ref, set } from "firebase/database";
import { db } from "./firebase";


export const setNotePrivacy = function(context, note, privacy) {
    const notePrivacyRef = ref(db, `notes/users/${context.user.uid}/notes/${note.id}/privacy`);
    set(notePrivacyRef, privacy)
}

export const getOneNote = function(userId, postId, setNoteState, errorCallback) {
    const notesRef = ref(db, `notes/users/${userId}/notes/${postId}`)
    // const userRef = ref(db, `notes/users/${userId}/profile`)
    get(notesRef).then( (snapshot ) => {
        const note = snapshot.val()
        if(note.privacy === "private") {
            errorCallback()
        } else {
            setNoteState(note)
        }
        
    }).catch( (err) => {
        errorCallback()
    });
}

export function getShareableLink(context, note) {
    return `${window.location.href}page/${context.user.uid}/${note.id}`;
}

export function copyShareableLink(context, note) {
    navigator.clipboard.writeText(getShareableLink(context, note))
}