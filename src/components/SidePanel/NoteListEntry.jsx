import { TrashIcon, ShareIcon } from '@heroicons/react/24/solid'
import { deleteNote } from '../../services/firebase';
import { Dropdown } from 'flowbite-react';
import { useContext } from "react"
import { AppContext } from "../Home"


export default function NoteListEntry(props) {
    const context = useContext(AppContext)
    const note = props.note
    return (
        <div key={note.id} className="flex flex-row transition-all hover:bg-zinc-300">
            <div
            onClick={() => context.setCurrentNote(note.id) }
            className={`px-4 py-1   w-full cursor-pointer font-mono tracking-tighter  ${context.currentNote === note.id ? 'font-bold bg-zinc-400 text-slate-100':'font-normal text-zinc-500'}`}>
                { note.title !== "" ? note.title : "Untitled" }
            </div>
            <Dropdown class="py-auto" >
                <Dropdown.Item>
                    <div className='mr-auto'>
                        Delete 
                    </div>
                    <TrashIcon className='w-4 ml-2 cursor-pointer hover:text-zinc-700' onClick={ () => deleteNote(note.id, context) }></TrashIcon>
                </Dropdown.Item>
                <Dropdown.Item>
                    <div className='mr-auto'>
                        Share 
                    </div>
                    <ShareIcon className='w-4 ml-2 cursor-pointer hover:text-zinc-700'/>
                </Dropdown.Item>
            </Dropdown>
        </div>
    )
}
