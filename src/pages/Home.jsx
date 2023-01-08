import SidePanel from "components/SidePanel/SidePanel";
import Statusbar from "components/Statusbar/Statusbar";
import React from 'react';
import {Outlet} from "react-router-dom";
import ModalManager from "components/UI/ModalManager";
import UserStateManager from "../components/Auth/UserStateManager";
function Home() {


  return (
    // Main App
    <div className="flex flex-col w-screen h-screen overflow-hidden">
      <ModalManager/>
      <UserStateManager/>
      <Statusbar/>
      <div className="flex flex-row h-screen overflow-auto">
        <SidePanel />
        <Outlet />
      </div>
    </div>
  );
}

export default Home;