import {ArrowLeftOnRectangleIcon, HomeIcon} from "@heroicons/react/24/solid";
import {useSelector} from "react-redux";
import authService from "../../services/firebaseAuthService";
export default function SidePanelProfile() {

  const user = useSelector((state) => state.auth);
  return (
    <div className='lg:hidden bg-zinc-100'>
      <div className='px-4 py-4 flex flex-row '>
        <img className="w-12 h-12 rounded-full mr-2" src={user.photoURL} alt="Rounded avatar"/>
        <div className='content-center font-semibold'>
          { user.displayName } <br/>
          <div className='font-light text-sm'>
            { user.email }
          </div>
        </div>
      </div>
      <a href="https://www.currentlynotes.com/" className='px-4 flex flex-row'>
        Homepage
        <HomeIcon className='ml-auto w-4 font-semibold pt-1'/>
      </a>
      <div className="cursor-pointer text-sm px-4 py-4 text-red-600 flex" onClick={ () => {authService.signOut()} }>
        Logout
        <ArrowLeftOnRectangleIcon className='ml-auto pt-1 w-4 font-semibold text-red-700'/>
      </div>
    </div>
  )
}