import { TrashIcon, ShareIcon } from '@heroicons/react/24/solid'
import { deleteNote } from 'services/firebase';
import { Dropdown } from 'flowbite-react';
import { useContext } from "react"
import { AppContext } from 'contexts/AppContext';
import SharingModal from 'components/SharingModal/SharingModal';
import PrivacyIcons from './PrivacyIcons';

export default function NoteListEntry(props) {
    const context = useContext(AppContext)
    const note = props.note
    return (
        <div key={note.id} className={`flex flex-row  hover:bg-zinc-300 ${context.currentNote === note.id ? 'font-bold bg-zinc-400 text-slate-100':'font-normal text-zinc-700'}`}>
            <div
            onClick={() => context.setCurrentNote(note.id) }
            className={`px-4 py-1 truncate overflow-hidden text-sm w-full cursor-pointer font-mono tracking-tighter `}>
                { note.title !== "" ? note.title : "Untitled" }
            </div>
            <PrivacyIcons note={note} />
            <div className='mr-4 ml-auto my-auto'>
                <Dropdown inline={true}>
                    <Dropdown.Item onClick={ () => context.setModalShareNote(note.id)}>
                        <div className='mr-auto'>
                            Share 
                        </div>
                        <ShareIcon className='w-4 ml-2 cursor-pointer hover:text-zinc-700'/>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <div className='mr-auto'>
                            Delete 
                        </div>
                        <TrashIcon className='w-4 ml-2 cursor-pointer hover:text-zinc-700' onClick={ () => deleteNote(note.id, context) }></TrashIcon>
                    </Dropdown.Item>
                </Dropdown>
            </div>
            <SharingModal />
        </div>
        
    )
}
