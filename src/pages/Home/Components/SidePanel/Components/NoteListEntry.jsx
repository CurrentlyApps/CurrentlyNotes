import { TrashIcon, ShareIcon } from '@heroicons/react/24/solid'
import { deleteNote } from 'services/firebase';
import { Dropdown } from 'flowbite-react';
import PrivacyIcons from './PrivacyIcons';
import { useNavigate, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {openModal, setModalData} from "stores/UI/uiModals";

export default function NoteListEntry(props) {
  const { post_id } = useParams();
  let note = props.note
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth);
  const openShareModal = (id) => {
    dispatch(setModalData(id))
    dispatch(openModal('ShareOptions'))
  }

  return (
      <div key={note.id} className={`flex flex-row  hover:bg-zinc-300 ${post_id === note.id ? 'font-bold bg-zinc-400 text-slate-100':'font-normal text-zinc-700'}`}>
          <div
          onClick={() => navigate(`/edit/${user.uid}/${note.id}`) }
          className={`px-4 py-1 truncate overflow-hidden text-sm w-full cursor-pointer font-mono tracking-tighter `}>
              { note.title !== "" ? note.title : "Untitled" }
          </div>
          <PrivacyIcons note={note} />
          <div className='mr-4 ml-auto my-auto'>
              <Dropdown label="" inline={true}>
                  <Dropdown.Item onClick={ () => openShareModal(note.id)}>
                      <div className='mr-auto'>
                          Share
                      </div>
                      <ShareIcon className='w-4 ml-2 cursor-pointer hover:text-zinc-700'/>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={ () => deleteNote(note.id) }>
                      <div className='mr-auto'>
                          Delete
                      </div>
                      <TrashIcon className='w-4 ml-2 cursor-pointer hover:text-zinc-700' ></TrashIcon>
                  </Dropdown.Item>
              </Dropdown>
          </div>
      </div>
  )
}
