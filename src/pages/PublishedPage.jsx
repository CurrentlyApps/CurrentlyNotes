import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneNote } from "../services/firebase";
import parse from 'html-react-parser';
import Showdown from "showdown";

const converter = new Showdown.Converter()

function About() {
  const { user_id, post_id } = useParams();
  const [ note, setNoteState ] = useState({
    title: "",
    body: ""
  });

  useEffect(() => {
    getOneNote(user_id, post_id, setNoteState);
  }, [user_id, post_id])
  
  
  
  return (
    
    <div className="w-full h-screen mx-auto py-5 lg:px-48 scrollbar_thin overflow-y-scroll">
        <div className="font-semibold text-lg">
            { note.title }
        </div>
        <div className="text-zinc-500">
          
        </div>
        <div className="text-lg is_markdown">
        {
            parse(converter.makeHtml(note.body))
        }
        </div>
    </div>
  );
}

export default About;
