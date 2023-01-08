import { DocumentPlusIcon } from '@heroicons/react/24/solid'
import { newNoteClicked} from 'services/firebase';
import NoteListEntry from './NoteListEntry'
import {useSelector} from "react-redux";
import SidePanelProfile from "./SidePanelProfile";

export default function SidePanel() {

    const sidebarExtended = useSelector((state) => state.ui.sidebarExtended)
    const user = useSelector((state) => state.auth)
    const notes = useSelector((state) => state.notes.notes)
    if (!user.isSignedIn) {
        return null;
    }

    return (
        <div className={`bg-zinc-200 relative transition-all duration-200 h-full ${sidebarExtended ? 'w-4/5 lg:w-1/5' : '-translate-x-96 w-0' }`}>
            <SidePanelProfile/>
            <div className='flex flex-row text-lg font-semibold px-4 pt-2 underline underline-offset-8 decoration-slate-800'>
                Your Notes
                <div className='ml-auto flex flex-row mt-1 transition-all'>
                    <DocumentPlusIcon className='w-4 hover:text-zinc-700 cursor-pointer ml-2' onClick={() => newNoteClicked()}  />
                </div>
            </div>
            <hr />
            { NoteEntryList(notes) }
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