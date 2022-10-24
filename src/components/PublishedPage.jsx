import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneNote } from "../services/firebase";
import parse from 'html-react-parser';
import Showdown from "showdown";

const converter = new Showdown.Converter()

function About() {
  const { user_id, post_id } = useParams();
  const [ note, setNoteState ] = useState({});

  useEffect(() => {
    getOneNote(user_id, post_id, setNoteState);
  }, [user_id, post_id])
  
  
  
  return (
    
    <div className="container w-full h-full mx-auto px-5 lg:px-20 overflow-y-auto">
        <div className="font-semibold text-lg">
            { note.title }
        </div>
        <div>
          by { note.author }
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
