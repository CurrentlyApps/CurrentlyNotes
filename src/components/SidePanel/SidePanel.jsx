import { DocumentPlusIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useContext } from 'react';
import { AppContext } from '../Home';
import { deleteNote, signIn, signOutClick } from '../../services/firebase';
import { newNoteClicked } from '../../services/firebase';


export default function SidePanel(props) {
    const context = useContext(AppContext)
    

    return (
        <div className={`bg-zinc-200 relative transition-all duration-200 ${context.extended ? 'w-96 lg-w-64' : '-translate-x-96 w-0' }`}>
            { context.user
                ? 
                <>
                    <div className='font-semibold px-4 pt-4 block lg:hidden'>
                        { context.user.displayName }
                    </div>
                    <div className="cursor-pointer text-sm px-4 pb-4 text-red-600 block lg:hidden" onClick={ () => {signOutClick(context)} }>Logout</div>

                    <div onClick={() => newNoteClicked(context)}
                    className='px-4 py-2 font-bold flex flex-row text-zinc-500 transition-all duration-150 cursor-pointer hover:text-zinc-800'>
                        New Note <DocumentPlusIcon className="w-4  ml-auto "></DocumentPlusIcon>
                    </div>
                </>
                : <div className="cursor-pointer text-lg text-zinc-800 font-bold px-4 py-2 block lg:hidden" onClick={ () => {signIn(context)} }> Login</div>
                
            }
            <hr />
            {
                context.user && 
                noteList(context.noteList, context)
            }
        </div>
    )
}

function noteList(list, context) {
    let listElement = [];
    Object.values(list).forEach(note => {
        listElement.push(
            <div key={note.id} className="flex flex-row">
                <div
                onClick={() => context.setCurrentNote(note.id) }
                className={`px-4 py-2 transition-all duration-150  w-full cursor-pointer hover:bg-zinc-300 ${context.currentNote === note.id ? 'font-bold bg-zinc-400 text-slate-100':'font-normal text-zinc-500'}`}>
                    { note.title !== "" ? note.title : "Untitled" }
                </div>
                <TrashIcon className='w-5 mx-4 cursor-pointer hover:text-zinc-700' onClick={ () => deleteNote(note.id, context) }></TrashIcon>
            </div>
        )
    });
    return listElement
}