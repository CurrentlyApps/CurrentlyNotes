import {Bars3Icon, UsersIcon} from "@heroicons/react/24/outline"
import StatusBarDropDown from "./StatusBarDropDown";
import StatusBarNoteTitle from "./StatusBarNoteTitle";

import {useDispatch, useSelector} from "react-redux";
import {toggleSidebar} from "stores/UI/uiSlice";
import {Route, Routes} from "react-router-dom";
import {getAuth} from "firebase/auth";

export default function Statusbar() {
  const sidebarExtended = useSelector((state) => state.ui.sidebarExtended)
  const note_meta = useSelector(state => state.notes.note_meta)
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth);
  const current_user = getAuth().currentUser;


  return (
      <div className="w-full text-zinc-200 bg-zinc-900 lg:px-6 px-2 py-2 flex lg:justify-between drop-shadow-xl">

          <div className={"md:w-1/3 1/4"}>
            <Bars3Icon
              onClick={ () => { dispatch(toggleSidebar())} }
              className={`${sidebarExtended ? 'rotate-180' : ''} cursor-pointer transition-all duration-300 w-7 h-7 my-auto `}
            />
          </div>
          <div className="lg:mx-auto md:w-1/3 grow flex justify-center ">

            <Routes>
              <Route path="/edit/:user_id/:note_id" element={
                <>
                  <StatusBarNoteTitle/>
                  { note_meta.user_id !== current_user.uid ?
                    <UsersIcon className={"w-4 my-auto"}/>
                    : ""}
                </>
              } />
            </Routes>

          </div>

          <div className="lg:flex hidden justify-end w-1/3">
              { user.isSignedIn ?
                <StatusBarDropDown />
                : ''
              }

          </div>
      </div>
)
}