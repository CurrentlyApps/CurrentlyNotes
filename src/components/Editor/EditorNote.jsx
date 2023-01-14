import {  useState } from "react"
import parse from 'html-react-parser';
import Showdown from "showdown";
import { useSelector} from "react-redux";
import firebaseNotesService from "../../services/firebaseNotesService";
import {Spinner} from "flowbite-react";

export default function EditorNote() {
  const converter = new Showdown.Converter({
    'tasklists': true,
    'smoothLivePreview': true,
    'smartIndentationFix': true,
    'emoji': true,
    'moreStyling': true
  })
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
    <div className={`flex lg:flex-row p-5 py-10 flex-col transition-all h-full overflow-hidden w-full`}>
      <div className={`flex flex-col w-full px-4 lg:h-full h-1/2 resize-y  ${showPreview ? 'lg:w-1/2 w-full' : 'lg:mx-auto lg:w-2/3'}`}>
        <div className="font-light flex flex-row px-4">
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
          className="h-full border-none outline-none focus:ring-0 overflow-auto px-4 scrollbar_thin"
          value={ note_content.body }
          onChange={ updateBody }
          placeholder="Insert Text Here"
        />
      </div>
      {
        showPreview === true
          ?
          <div className={`transition-all flex flex-col lg:w-1/2 lg:h-full h-1/2`}>
            <div className={`font-light w-full px-2`}>
              Preview
              <hr />
            </div>

            <div className={`h-full overflow-y-auto scrollbar_thin px-2`}>
              <div className="text-xl">
                { note_content.title }
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
