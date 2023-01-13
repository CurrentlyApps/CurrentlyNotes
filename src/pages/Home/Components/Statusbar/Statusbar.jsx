import { Bars3Icon } from "@heroicons/react/24/solid"
import StatusBarDropDown from "./StatusBarDropDown";
import StatusBarNoteTitle from "./StatusBarNoteTitle";

import {useDispatch, useSelector} from "react-redux";
import {toggleSidebar} from "stores/UI/uiSlice";
import {Route, Routes} from "react-router-dom";

export default function Statusbar() {
  const sidebarExtended = useSelector((state) => state.ui.sidebarExtended)

  const dispatch = useDispatch()
  const user = useSelector(state => state.auth);
  return (
      <div className="w-full text-zinc-200 bg-zinc-900 lg:px-4 px-2 py-2 flex lg:justify-between drop-shadow-xl">

          <Bars3Icon
            onClick={ () => { dispatch(toggleSidebar())} }
            className={`${sidebarExtended ? 'rotate-180' : ''} cursor-pointer transition-all duration-300 w-7 h-7 my-auto `}
          />
          <div className="lg:mx-auto flex justify-center ">

            <Routes>
              <Route path="/edit/:user_id/:note_id" element={<StatusBarNoteTitle/>} />
            </Routes>

          </div>

          <div className="lg:flex hidden justify-end ">
              { user.isSignedIn ?
                <>
                  <img className="w-9 h-9 bg-zinc-100 rounded-full mr-4" src={user.photoURL} alt="Rounded avatar"/>
                  <StatusBarDropDown />
                </>
                : ''
              }

          </div>
      </div>
)
}