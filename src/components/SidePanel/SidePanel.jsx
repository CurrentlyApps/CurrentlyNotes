import { DocumentPlusIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useContext, useEffect } from 'react';
import { AppContext } from '../Home';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { set, getDatabase, ref } from 'firebase/database'

const provider = new GoogleAuthProvider();

export default function SidePanel(props) {
    const context = useContext(AppContext)
    const auth = getAuth();

    const deleteNote = function(noteId) {
        const db = getDatabase(context.firebase);
        const notesRef = ref(db, `/notes/users/${context.user.uid}/notes/${noteId}`);
        context.setCurrentNote(null);
        set(notesRef, null);
    }   

    const signOutClick = function() {
        let auth = getAuth();
        signOut(auth);
        context.setUserState( null );
        context.setCurrentNote( null );
    }

    const signIn = function() {
        
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                context.setUserState(result.user);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            }
        );
    }

    return (
        <div className="w-64 bg-zinc-200 h-screen">
            <div className="font-bold p-4 text-xl">
                CURRENT
                
            </div>
            <div className='px-4 font-semibold border-b-2 border-zinc-300'>
                Account
            </div>
            <div className="p-4">
                { context.user == null
                 ? <div className="cursor-pointer text-sm text-green-700" onClick={ signIn }> Login</div>
                 : <div className="">
                    { context.user.displayName }
                    <div className="cursor-pointer text-sm text-red-700" onClick={ signOutClick }>Logout</div>
                    </div>
                }
            </div>
            <div className='px-4 font-semibold border-b-2 border-zinc-300'>
                Notes
            </div>
            { context.user
                ? <div
                onClick={() => props.newNoteClicked()}
                className='px-4 py-2 font-bold flex flex-row text-zinc-500 transition-all duration-150 cursor-pointer hover:text-zinc-800'>
                    New Note <DocumentPlusIcon className="w-4  ml-auto "></DocumentPlusIcon>
                </div>
                : ""
            }
            <hr />
            {
                context.user && 
                noteList(props.notes, props.noteClicked, props.currentNote, deleteNote)
            }
        </div>
    )
}

function noteList(list, noteClicked, currentNote, deleteNote) {
    let listElement = [];
    Object.values(list).forEach(note => {
        listElement.push(
            <div className="flex flex-row">
                <div
                key={note.id}
                onClick={() => noteClicked(note.id)}
                className={`px-4 py-2 transition-all duration-150  w-full cursor-pointer hover:bg-zinc-300 ${currentNote === note.id ? 'font-bold bg-zinc-400 text-slate-100':'font-normal text-zinc-500'}`}>
                    { note.title !== "" ? note.title : "Untitled" }
                </div>
                <TrashIcon className='w-5 mx-4 cursor-pointer hover:text-zinc-700' onClick={ () => deleteNote(note.id) }></TrashIcon>
            </div>
        )
    });
    return listElement
}