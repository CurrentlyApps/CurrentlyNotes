import { Outlet } from "react-router-dom";
import {useSelector} from "react-redux";




export default function Editor() {
  const sidebarExtended = useSelector((state) => state.ui.sidebarExtended);
  const sidebarClass = sidebarExtended ?  'lg:w-4/5 w-1/5' : 'w-full';

  return (
      <div className={`pt-5 flex lg:flex-row flex-col transition-all h-full overflow-hidden ${sidebarClass}`}>
          <Outlet/>
      </div>
  )
}