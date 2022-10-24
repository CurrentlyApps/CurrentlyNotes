import { DocumentPlusIcon } from '@heroicons/react/24/solid'
import { useContext } from 'react';
import { AppContext } from '../Home';
import { signIn, signOutClick } from '../../services/firebase';
import { newNoteClicked } from '../../services/firebase';
import NoteListEntry from './NoteListEntry'

export default function SidePanel(props) {
    const context = useContext(AppContext)
    
    return (
        <div className={`bg-zinc-200 relative transition-all duration-200 h-full ${context.extended ? 'w-4/5' : '-translate-x-96 w-0' }`}>
            { context.user
                ? 
                <>
                    <div className='font-semibold px-4 pt-4 block lg:hidden'>
                        { context.user.displayName }
                    </div>
                    <div className="cursor-pointer text-sm px-4 pb-4 text-red-600 block lg:hidden" onClick={ () => {signOutClick(context)} }>Logout</div>
                    <div className='flex flex-row text-lg font-semibold px-4 pt-3 underline underline-offset-8 decoration-slate-800'>
                        Your Notes
                        <div className='ml-auto flex flex-row mt-1 transition-all'>
                            <DocumentPlusIcon className='w-4 hover:text-zinc-700 cursor-pointer ml-2' onClick={() => newNoteClicked(context)}  />
                        </div>
                    </div>
                </>
                : <div className="cursor-pointer text-lg text-zinc-800 font-bold px-4 py-2 block lg:hidden" onClick={ () => {signIn(context)} }> Login</div>
                
            }
            <hr />
            { noteList(context.noteList, context) }
        </div>
    )
}

function noteList(list, context) {
    if( !context.user ){
        return 
    }
    let listElement = [];
    Object.values(list).forEach(note => {
        listElement.push(
            <NoteListEntry note={note} />
        )
    });
    return listElement
}