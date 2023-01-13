import {Home} from "../index";
import {Route} from "react-router-dom";
import EditorNoNoteSelected from "../../components/Editor/EditorNoNoteSelected";
import EditorNote from "../../components/Editor/EditorNote";


export default function HomeRouter() {
  return (
    <Route path="/" element={<Home />} >
      <Route path="" element={<EditorNoNoteSelected/>} />
      <Route path="edit/:user_id/:post_id" element={<EditorNote />} />
    </Route>
  )
}