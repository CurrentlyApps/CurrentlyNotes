import { DocumentPlusIcon, ArrowLeftOnRectangleIcon, HomeIcon } from '@heroicons/react/24/solid'
import { useContext } from 'react';
import { AppContext } from 'contexts/AppContext';
import { signInWithGoogle, signOutClick, newNoteClicked } from 'services/firebase';
import NoteListEntry from './NoteListEntry'
import {useSelector} from "react-redux";

export default function SidePanel() {
    const context = useContext(AppContext)

    const sidebarExtended = useSelector((state) => state.ui.sidebarExtended)

    if (!context.user) {
        return null;
    }

    return (
        <div className={`bg-zinc-200 relative transition-all duration-200 h-full ${sidebarExtended ? 'w-4/5 lg:w-1/5' : '-translate-x-96 w-0' }`}>
            <div className="px-4 my-3 underline underline-offset-8 decoration-slate-800">
                <div className="py-auto align-middle my-auto mr-1 tracking-widest uppercase lg:hidden block font-semibold">Currently</div>
            </div>
            { context.user
                ? 
                <>
                    <div className='lg:hidden bg-zinc-100'>
                        <div className='px-4 py-4 flex flex-row '>
                            <img className="w-12 h-12 rounded-full mr-2" src={context.user.photoURL} alt="Rounded avatar"/>
                            <div className='content-center font-semibold'>
                                { context.user.displayName } <br/>
                                <div className='font-light text-sm'>
                                    { context.user.email }
                                </div>
                            </div>
                        </div>
                        <a href="https://www.currentlynotes.com/" className='px-4 flex flex-row'>
                            Homepage
                            <HomeIcon className='ml-auto w-4 font-semibold pt-1'/>
                        </a>
                        <div className="cursor-pointer text-sm px-4 py-4 text-red-600 flex" onClick={ () => {signOutClick(context)} }>
                            Logout
                            <ArrowLeftOnRectangleIcon className='ml-auto pt-1 w-4 font-semibold text-red-700'/>
                        </div>
                    </div>
                    <div className='flex flex-row text-lg font-semibold px-4 pt-2 underline underline-offset-8 decoration-slate-800'>
                        Your Notes
                        <div className='ml-auto flex flex-row mt-1 transition-all'>
                            <DocumentPlusIcon className='w-4 hover:text-zinc-700 cursor-pointer ml-2' onClick={() => newNoteClicked(context)}  />
                        </div>
                    </div>
                </>
                : <div className="cursor-pointer text-lg text-zinc-800 font-bold px-4 py-2 block lg:hidden" onClick={ () => {signInWithGoogle(context)} }> Login</div>
                
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
            <NoteListEntry key={note.id} note={note} />
        )
    });
    return listElement
}