import { ref, set } from "firebase/database";
import { db } from "./firebase";
import store from "../stores/store";

export const setNotePrivacy = function(note, privacy) {
    let user = store.getState().auth;
    const notePrivacyRef = ref(db, `notes_meta/${user.uid}/${note.id}/privacy`);
    set(notePrivacyRef, privacy)
}


export function getShareableLink(note, privacy) {
    let user = store.getState().auth;
    if( privacy === "publish") {
        return `${window.location.host}/page/${user.uid}/${note.id}`;
    } else if (privacy === "collab") {
        return `${window.location.host}/edit/${user.uid}/${note.id}`;
    }
}

export function copyShareableLink(note) {
    navigator.clipboard.writeText(getShareableLink( note))
}