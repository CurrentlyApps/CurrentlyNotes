import {  useState } from "react"
import parse from 'html-react-parser';
import { useSelector} from "react-redux";
import firebaseNotesService from "../../services/firebaseNotesService";
import {Spinner} from "flowbite-react";
import 'highlight.js/styles/github-dark-dimmed.css';
import showdownHighlight from "showdown-highlight";
import Showdown from "showdown";

const converter = new Showdown.Converter({
  'tasklists': true,
  'smoothLivePreview': true,
  'smartIndentationFix': true,
  'emoji': true,
  'extensions': [showdownHighlight({ pre: true })]
});

export default function EditorNote() {



  converter.setFlavor('github');
  const [showPreview, setShowPreview] = useState(true)
  const updateBody = function(event) {
    firebaseNotesService.updateNoteContent({
      ...note_content,
      body: event.target.value
    });
  }

  const handleTab = e => {
    if (e.key === 'Tab') {
      const target = e.target
      e.preventDefault();

      let end = target.selectionEnd;
      let start = target.selectionStart;

      target.value = target.value.substring(0, start) + "\t\t\t\t\t" + target.value.substring(end);
      target.selectionStart = target.selectionEnd = start + 1;
    }
  }

  const note_content = useSelector(state => state.notes.note_content);
  const note_meta = useSelector(state => state.notes.note_meta);

  if (!note_content.id) {
    return (
      <div className={"w-full h-60 mt-52 text-center"}>
        <Spinner size={"xl"}/>
        <div className={"text-zinc-400 mt-4"}>
          Loading your note...
        </div>
      </div>
    )
  }

  return (
    <div className={`flex md:flex-row flex-col md:px-5 px-2 md:pt-10 transition-all grow overflow-hidden `}>
      <div className={`md:px-4 flex flex-col w-full md:w-1/2  grow md:grow-0  ${showPreview ? 'md:w-1/2 w-full ' : 'md:mx-auto md:w-2/3'}`}>

        <div className="font-light flex flex-row grow pb-5">
          <button onClick={() => setShowPreview((prevState) => {return !prevState })} className="text-zinc-700 hover:text-zinc-600">
            Toggle Preview
          </button>
          <a
            className={"ml-auto text-sm"}
            target={"_blank"}
            href={"https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"} rel="noreferrer">
            Markdown Guide
          </a>
          <hr />
        </div>

        <textarea
          onKeyDown={ handleTab }
          className="h-full border-none outline-none focus:ring-0 overflow-auto px-4 scrollbar_thin pb-40"
          value={ note_content.body }
          onChange={ updateBody }
          placeholder="Insert Text Here"
        />
      </div>
      {
        showPreview === true
          ?
          <div className={`transition-all  md:px-4 flex flex-col md:w-1/2 h-1/2 md:h-full h-1/2`}>
            <div className={`text-zinc-600 pb-5`}>
              Preview
            </div>

            <div className={`h-full overflow-y-auto scrollbar_thin pb-40`}>
              <div className="text-lg font-bold text-zinc-600 mb-6">
                { note_meta.title }
              </div>
              <div className={`prose prose-stone`} >
                {
                  parse(converter.makeHtml(note_content.body))
                }
              </div>
            </div>
          </div>
          : ""
      }
    </div>
  )
}
