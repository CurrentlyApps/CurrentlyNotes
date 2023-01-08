import { useEffect, useRef, useState} from "react";
import {updateNote} from "../../services/firebase";
import {useParams} from "react-router-dom";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {useSelector} from "react-redux";

export default function StatusBarNoteTitle () {
  const inputRef = useRef(null);

  const { user_id } = useParams();
  const [editTitle, setEditTitle] = useState(false);

  const updateTitle = function(event){
    let tempNote = { ...currentNote, title: event.target.value }
    updateNote(tempNote, user_id)
  }

  useEffect(() => {
    if (editTitle) {
      inputRef.current?.focus()
    }
  } , [editTitle]);

  const currentNote = useSelector(state => state.notes.currentNote)

  if (currentNote == null) {
    return null;
  }


  if (!editTitle) {
    return (
      <div hidden={editTitle}
        className="duration-75 transition-all truncate ... hover:underline underline-offset-8 px-4  cursor-pointer text-zinc-100 my-auto flex flex-r0w"
        onClick={ () => setEditTitle(true)} >
        { currentNote.title }
        <PencilSquareIcon className={"w-3 my-auto ml-2 text-zinc-300"} />
      </div>
    );
  }
  return (
      <div className="flex flex-row">
        <input
            type={"text"}
            hidden={!editTitle}
            ref={inputRef}
            className={"appearance-none bg-zinc-900 text-sm p-0"}
            value={ currentNote.title }
            onChange={ updateTitle }
            onBlur={ () => { setEditTitle(false) } }
            placeholder="Title"
        />

      </div>
  )
}