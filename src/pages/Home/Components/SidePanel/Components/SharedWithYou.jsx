import {useEffect, useState} from "react";
import firebaseSharingService from "services/firebaseSharingService";
import {getAuth} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {BookOpenIcon, PencilIcon} from "@heroicons/react/24/outline";

export default function SharedWithYou() {
  const [sharedNotes, setSharedNotes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAuth().onAuthStateChanged(() => {
      setSharedNotes([]);
      firebaseSharingService.getSharedWithUser(setSharedNotes)
    });
  }, []);

  const handleNoteClick = (note) => {
    if (note.shared_info.collab) {
      navigate(`/edit/${note.user_id}/${note.id}`);
    } else {
      navigate(`/page/${note.user_id}/${note.id}`);
    }

  }

  return (
    <div className='flex flex-col text-lg block font-semibold pb-4  h-full'>
      <div className={"py-4 px-4"}>
        Shared with you
      </div>
      {
        sharedNotes.map((note) => {
          return (
            <div
              onClick={ () => handleNoteClick(note) }
              key={`${note.id}/${note.user_id}`}
              className='flex flex-row cursor-pointer hover:bg-zinc-300 text-zinc-500 text-sm px-4 py-2'
            >
              <div>{ note.title }</div>
              <div className={"ml-auto w-5"}>
                { note.shared_info.publish ? <BookOpenIcon/> : '' }
                { note.shared_info.collab ? <PencilIcon/> : '' }

              </div>
            </div>
          )
        })
      }
    </div>
  )
}