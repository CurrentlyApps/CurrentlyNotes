import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOneNote } from "services/noteSharing";
import parse from 'html-react-parser';
import Showdown from "showdown";


const converter = new Showdown.Converter()

export default function About() {
  const navigate = useNavigate();
  const { user_id, post_id } = useParams();
  const [ note, setNoteState ] = useState({
    title: "",
    body: ""
  });
  
  useEffect(() => {
    getOneNote(user_id, post_id, setNoteState, ()=>navigate("/page/error"));
  }, [user_id, post_id, navigate])
  
  
  
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


