import { ref, set } from "firebase/database";
import { db } from "./firebase";


export const setNotePrivacy = function(context, note, privacy) {
    const notePrivacyRef = ref(db, `notes/users/${context.user.uid}/notes/${note.id}/privacy`);
    set(notePrivacyRef, privacy)
}


export function getShareableLink(context, note) {
    return `${window.location.host}/page/${context.user.uid}/${note.id}`;
}

export function copyShareableLink(context, note) {
    navigator.clipboard.writeText(getShareableLink(context, note))
}