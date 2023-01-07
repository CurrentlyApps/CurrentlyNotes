import {AppContext} from "contexts/AppContext";
import {useContext} from "react";

export default function StatusBarNoteTitle () {
  const context = useContext(AppContext);
  // Editable title
  return (
      <div className="my-auto p-0">
        <div className="flex flex-row">
          <div className="hidden lg:block">{ context.note ? context.note.title : '' }</div>
        </div>
      </div>
  )
}