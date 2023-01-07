import {AppContext} from "contexts/AppContext";
import {useContext, useEffect, useRef, useState} from "react";
import {updateNote} from "../../services/firebase";
import {useParams} from "react-router-dom";
import {PencilSquareIcon} from "@heroicons/react/24/outline";

export default function StatusBarNoteTitle () {
  const context = useContext(AppContext);
  const inputRef = useRef(null);

  const { user_id } = useParams();
  const [editTitle, setEditTitle] = useState(false);

  const updateTitle = function(event){
    let tempNote = { ...context.note, title: event.target.value }
    updateNote(tempNote, user_id)
  }

  useEffect(() => {
    if (editTitle) {
      inputRef.current?.focus()
    }
  } , [editTitle]);

  if (context.note == null) {
    return null;
  }


  if (!editTitle) {
    return (
      <div hidden={editTitle}
        className="duration-75 transition-all hover:underline underline-offset-8 px-4  cursor-pointer text-zinc-100 my-auto flex flex-r0w"
        onClick={ () => setEditTitle(true)} >
        { context.note.title }
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
            value={ context.note.title }
            onChange={ updateTitle }
            onBlur={ () => { setEditTitle(false) } }
            placeholder="Title"
        />

      </div>
  )
}