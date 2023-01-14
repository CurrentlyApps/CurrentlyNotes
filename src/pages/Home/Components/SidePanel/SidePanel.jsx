import {Bars3Icon, DocumentPlusIcon} from '@heroicons/react/24/solid'
import {useDispatch, useSelector} from "react-redux";
import SidePanelProfile from "./Components/SidePanelProfile";
import {toggleSidebar} from "stores/UI/uiSlice";
import NoteList from "./Components/NoteList";
import firebaseNotesService from "services/firebaseNotesService";
import {getAuth} from "firebase/auth";
import {useNavigate} from "react-router-dom";

export default function SidePanel() {

  const sidebarExtended = useSelector((state) => state.ui.sidebarExtended)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleNewNote = () => {
    const user = getAuth().currentUser;
    const newNoteKey = firebaseNotesService.createNote();
    navigate(`/edit/${user.uid}/${newNoteKey}`);
  }

  return (
    <div className={`cn_sidebar ${sidebarExtended ? 'md:w-96 p-4' : '-transform-x-full  w-0 px-0'}`}>

      <div className="inline-block px-3 mb-5 relative flex flex-row " >
        <div className="cn_title ">Currently Notes</div>
        <Bars3Icon
          onClick={ () => { dispatch(toggleSidebar())} }
          className={`${sidebarExtended ? 'rotate-180' : ''}
          md:hidden ml-auto cursor-pointer transition-all duration-300 w-7 h-7 my-auto `}
        />
      </div>

      <SidePanelProfile/>

      <div className='flex flex-row text-lg block font-semibold pb-4 px-4'>
        Your Notes
        <div className='ml-auto mt-1 transition-all'>
          <DocumentPlusIcon
            className='w-4 hover:text-zinc-700 cursor-pointer '
            onClick={() => handleNewNote()}
          />
        </div>
      </div>
      <NoteList/>

    </div>
    )
}



