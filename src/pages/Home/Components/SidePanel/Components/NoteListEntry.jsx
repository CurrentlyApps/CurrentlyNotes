import { TrashIcon, ShareIcon } from '@heroicons/react/24/solid'
import { Dropdown } from 'flowbite-react';
import PrivacyIcons from './PrivacyIcons';
import { useNavigate, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {openModal, setModalData} from "stores/UI/uiModals";
import firebaseNotesService from "services/firebaseNotesService";
import {toggleSidebar} from "../../../../../stores/UI/uiSlice";
import {addPopup} from "stores/UI/globalPopupSlice";

export default function NoteListEntry(props) {
  const { post_id } = useParams();
  let note_meta = props.note
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth);
  const openShareModal = (id) => {
    dispatch(setModalData(id))
    dispatch(openModal('ShareOptions'))
  }

  const entryClick = () => {
    navigate(`/edit/${user.uid}/${note_meta.id}`)
    let mediaQuery = window.matchMedia('(max-width: 768px)');
    if (mediaQuery.matches) {
      dispatch(toggleSidebar(false));
    }
  }
  const handleDelete = () => {

    firebaseNotesService.deleteNote(note_meta)
    navigate("/");
    dispatch(addPopup({
      title: "Note Deleted",
      message: "Your note has been deleted",
      type: "success"
    }));
  }

  return (
      <div key={note_meta.id} className={`flex flex-row  hover:bg-zinc-300 ${post_id === note_meta.id ? 'font-bold bg-zinc-400 text-slate-100':'font-normal text-zinc-700'}`}>
          <div
          onClick={() => entryClick() }
          className={`px-4 py-1 truncate overflow-hidden text-sm w-full cursor-pointer font-mono tracking-tighter `}>
              { note_meta.title !== "" ? note_meta.title : "Untitled" }
          </div>
          <PrivacyIcons note={note_meta} />
          <div className='mr-4 ml-auto my-auto'>
              <Dropdown label="" inline={true}>
                  <Dropdown.Item onClick={ () => openShareModal(note_meta.id)}>
                      <div className='mr-auto'>
                          Share
                      </div>
                      <ShareIcon className='w-4 ml-2 cursor-pointer hover:text-zinc-700'/>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={ () => handleDelete() }>
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
