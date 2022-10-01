import SidePanel from "./SidePanel/SidePanel";
import React, { useState } from 'react';

function Home() {

  const [noteList] = useState([
    {
        id: 1,
        title: "Note #1",
        body: "Consequat sunt eiusmod mollit proident esse sunt aliqua qui est reprehenderit consectetur consectetur nisi. Culpa sit sint consequat dolore eu eiusmod irure sunt mollit aliquip nostrud exercitation minim ad. Tempor nostrud non magna id aliquip et. Velit excepteur sit anim Lorem ad in incididunt velit veniam quis."
    }
  ]);


  const noteClicked = function(id) {

  }

  return (
    <div className="w-screen h-screen flex flex-row">
      <SidePanel notes={noteList} />
    </div>
  );
}

export default Home;