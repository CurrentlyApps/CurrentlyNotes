import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import parse from 'html-react-parser';
import Showdown from "showdown";
import firebaseNotesService from "services/firebaseNotesService";
import {useSelector} from "react-redux";
import {Spinner} from "flowbite-react";
import {getAuth} from "firebase/auth";

export default function About() {
  const converter = new Showdown.Converter();
  converter.setFlavor('github');
  const navigate = useNavigate();
  const { user_id, post_id } = useParams();
  const note_content = useSelector(state => state.notes.note_content);
  const note_meta = useSelector(state => state.notes.note_meta);

  useEffect(() => {
    getAuth().onAuthStateChanged(() => {
      firebaseNotesService.getNoteMeta(user_id, post_id);
      firebaseNotesService.getNoteContent(user_id, post_id);
    });
  }, [user_id, post_id, navigate])

  if (!note_content.id) {
    return (
      <div className={"w-full h-60 mt-52 text-center"}>
        <Spinner size={"xl"}/>
        <div className={"text-zinc-400 mt-4"}>
          Loading...
        </div>
      </div>
    )
  }

  document.title = note_meta.title + " - Currently Notes";

  return (
    <div className="w-screen min-h-screen h-full scrollbar_thin overflow-y-scroll bg-zinc-100">
        <div className="h-screen md:mx-auto pt-5 md:w-1/2">
          <div className={`prose max-w-none  prose-stone `} >
            {
              parse(converter.makeHtml(note_content.body))
            }
          </div>
        </div>
    </div>
  );
}


