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
    
    <div className="w-screen h-screen lg:px-72 scrollbar_thin overflow-y-scroll bg-zinc-100">
        <div className=" shadow-lg pt-5">
          <div className="font-semibold text-md lg:text-xl lg:px-32">
              { note.title }
          </div>
          <div className="text-zinc-500 lg:px-32">
            
          </div>
          <div className="is_markdown text-sm md:text-md lg:px-32">
          {
              parse(converter.makeHtml(note.body))
          }
          </div>
        </div>
    </div>
  );
}


