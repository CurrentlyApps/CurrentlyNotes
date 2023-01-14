import { useEffect, useRef, useState} from "react";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {useSelector} from "react-redux";
import firebaseNotesService from "services/firebaseNotesService";

export default function StatusBarNoteTitle () {
  const inputRef = useRef(null);
  const [editTitle, setEditTitle] = useState(false);

  const updateTitle = function(event){
    firebaseNotesService.updateNoteMeta({ ...note_meta, title: event.target.value })
  }

  useEffect(() => {
    if (editTitle) {
      inputRef.current?.focus()
    }
  } , [editTitle]);

  const note_meta = useSelector(state => state.notes.note_meta)

  if (note_meta == null) {
    return null;
  }


  if (!editTitle) {
    return (
      <div hidden={editTitle}
        className="duration-75 transition-all truncate ... hover:underline underline-offset-8 px-4  cursor-pointer text-zinc-100 my-auto flex flex-r0w"
        onClick={ () => setEditTitle(true)} >
        { note_meta.title === "" ?
          "Untitled"
          :
          note_meta.title
        }
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
            className={"appearance-none bg-zinc-900 text-md px-5 py-0"}
            value={ note_meta.title }
            onChange={ updateTitle }
            onBlur={ () => { setEditTitle(false) } }
            placeholder="Title"
        />

      </div>
  )
}