import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parse from 'html-react-parser';
import Showdown from "showdown";
import { get, ref } from "firebase/database";
import { db } from "services/firebase";


const converter = new Showdown.Converter()

export default function About() {
  const navigate = useNavigate();
  const { user_id, post_id } = useParams();
  const [ note, setNoteState ] = useState({
    title: "",
    body: ""
  });
  
  const [loadingNote, setLoadingNote] = useState(true);
  const [loadingAuthor, setLoadingAuthor] = useState(true);
  const [author, setAuthor] = useState({})

  useEffect(() => {
    const notesRef = ref(db, `notes/users/${user_id}/notes/${post_id}`)
    const authorRef = ref(db, `notes/users/${user_id}/profile`)
    
  
    get(notesRef).then( (snapshot ) => {
        const note = snapshot.val()
        setLoadingNote(false)
        setNoteState(note)
    }).catch( () => {
      navigate("/404");
    });

    get(authorRef).then( (snapshot) => {
      setAuthor(snapshot.val());
      setLoadingAuthor(false)
    });
  }, [user_id, post_id, navigate])
  
  
  
  return (
    
    <div className="w-screen h-screen lg:px-72 scrollbar_thin overflow-y-scroll bg-zinc-100">
        <div className="h-screen shadow-lg pt-5">
          <div className="font-semibold text-md lg:text-xl lg:px-32">
              { 
                loadingNote
                ? <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-900 max-w-[360px] mb-2.5"></div>
                : note.title }
          </div>
          <div className="text-zinc-500 lg:px-32 text-sm">
            by { !loadingAuthor && !loadingNote ? author.displayName : 'Anonymous' }
          </div>
          <div className={`${loadingNote ? '' : 'is_markdown'} text-sm md:text-md lg:px-32`} >
          {
            loadingNote
            ? 
            <div role="status" className="w-full mt-10 animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-900 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-900 max-w-[460px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-900 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-900 max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-900 max-w-[300px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-900 max-w-[660px]"></div>
                <span className="sr-only">Loading...</span>
            </div>
            :            
            parse(converter.makeHtml(note.body))
          }
          </div>
        </div>
    </div>
  );
}


