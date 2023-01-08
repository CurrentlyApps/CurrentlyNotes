import { ref, set } from "firebase/database";
import { db } from "./firebase";
import store from "../stores/store";

export const setNotePrivacy = function(note, privacy) {
    let user = store.getState().auth;
    const notePrivacyRef = ref(db, `notes/users/${user.uid}/notes/${note.id}/privacy`);
    set(notePrivacyRef, privacy)
}


export function getShareableLink(note) {
    let user = store.getState().auth;
    return `${window.location.host}/page/${user.uid}/${note.id}`;
}

export function copyShareableLink(note) {
    navigator.clipboard.writeText(getShareableLink( note))
}