import { useContext } from "react"
import { AppContext } from 'contexts/AppContext';
import { Bars3Icon } from "@heroicons/react/24/solid"
import StatusBarDropDown from "./StatusBarDropDown";
import StatusBarNoteTitle from "./StatusBarNoteTitle";

import {useDispatch, useSelector} from "react-redux";
import {toggleSidebar} from "stores/UI/uiSlice";

export default function Statusbar() {
  const context = useContext(AppContext)
  const sidebarExtended = useSelector((state) => state.ui.sidebarExtended)

  const dispatch = useDispatch()

  return (
      <div className="w-full text-zinc-200 bg-zinc-900 lg:px-4 px-2 py-2 flex lg:justify-between">
          <div className="lg:font-extrabold  lg:text-lg  flex flex-row cursor-pointer" onClick={ () => { dispatch(toggleSidebar()) } }>
              <div className="py-auto align-middle my-auto mr-1 tracking-widest uppercase hidden lg:block">Currently Notes</div>
              <Bars3Icon className={`${sidebarExtended ? 'rotate-180' : ''} transition-all w-7 h-7 my-auto lg:ml-2`} />
          </div>

          <div className="lg:mx-auto flex justify-center "><StatusBarNoteTitle/>
          </div>

          <div className="lg:flex hidden  justify-end ">
              { context.user ? <img className="w-9 h-9 rounded-full border-2 mr-4" src={context.user.photoURL} alt="Rounded avatar"/> : ''}
              <StatusBarDropDown />
          </div>
      </div>
)
}