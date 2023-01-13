import SidePanel from "pages/Home/Components/SidePanel/SidePanel";
import Statusbar from "./Components/Statusbar/Statusbar";
import React, {useEffect} from 'react';
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import ModalManager from "./Components/Modals/ModalManager";
import UserStateManager from "components/Auth/UserStateManager";
import {getAuth} from "firebase/auth";
import {useSelector} from "react-redux";
import firebaseNotesService from "../../services/firebaseNotesService";
function Home() {

  let navigate = useNavigate()
  useEffect( () => {
    getAuth().onAuthStateChanged((user) => {
      if (!user) {
        navigate("/auth/login");
      }
    });
  });

  const location = useLocation();
  const {user_id, post_id} = useParams();
  useEffect( () => {
    if (user_id && post_id) {
      firebaseNotesService.getNoteContent(user_id, post_id);
      firebaseNotesService.getNoteMeta(user_id, post_id);
    }
  }, [location, user_id, post_id]);

  const note_meta = useSelector(state => state.notes.note_meta);
  useEffect( () => {
    if( note_meta.title ) {
      document.title = note_meta.title + " - Currently Notes";
    } else {
      document.title = "Currently Notes";
    }
  }, [note_meta]);

  let sidebarExtended = useSelector((state) => state.ui.sidebarExtended)

  return (
    // Main App
    <div className="w-screen h-screen overflow-hidden">
      <ModalManager/>
      <UserStateManager/>
      <div className="flex flex-row relative h-screen ">
        <SidePanel />
        <div className={`flex relative transition-all flex-col grow ${sidebarExtended ? 'md:ml-96' : 'md:ml-0'}`}>
          <Statusbar/>
          <div className={`flex lg:flex-row flex-col transition-all  grow overflow-hidden`}>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;