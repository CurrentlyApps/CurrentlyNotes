import { useContext, useEffect } from "react"
import { db, updateNote } from "services/firebase"
import { AppContext } from 'contexts/AppContext';
import parse from 'html-react-parser';
import Showdown from "showdown";
import { useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { onValue, ref } from "firebase/database";

export default function EditorNote() {
    const converter = new Showdown.Converter()
    const context = useContext(AppContext)
    const { user_id, post_id } = useParams();

    const note = context.noteList[post_id];

    const updateTitle = function(event){
        let tempNote = { ...note, title: event.target.value }
        updateNote(tempNote, user_id)
    }

    const updateBody = function(event) {
        let tempNote = { ...note, body: event.target.value }
        updateNote(tempNote, user_id)
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

    useEffect( () => {
        const notesRef = ref(db, `/notes/users/${user_id}/notes/${post_id}`);
        onValue(notesRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data)
        });
    }); 

    if ( context.loadingNotes ) {
        return (
            <div className={`mx-auto pt-28`}>
                <Spinner aria-label="Loading Note" size="xl" />
            </div>
        )
    }

    return (
        <div className={`pt-5 flex lg:flex-row flex-col transition-all h-full overflow-hidden ${context.extended ? 'lg:w-4/5 w-1/5' : 'w-full'}`}>
            {
                context.editState === true &&
                <>
                    <div className="flex flex-col lg:w-1/2 w-full lg:pl-10 lg:px-5 pl-4 pr-1 lg:h-full h-1/2 resize-y">
                        <div className="font-light px-3">
                            Edit Markup
                            <hr />
                        </div>
                        <input 
                        className="w-full text-lg border-none outline-none px-3 focus:ring-0 text-xl"
                        value={ note.title }
                        onChange={ updateTitle }
                        placeholder="Title"
                        />
                        
                        <textarea
                        onKeyDown={ handleTab }
                        className="h-full border-none outline-none focus:ring-0 overflow-auto scrollbar_thin resize-none"
                        value={ note.body }
                        onChange={ updateBody }
                        placeholder="Insert Text Here"
                        />
                    </div>
                </>
            }
            <div className={`transition-all flex flex-col ${!context.editState ? 'w-full h-full' : 'lg:w-1/2 lg:h-full h-1/2'}`}>
                <div className={`font-light ${!context.editState ? 'w-full px-64' : 'p'}`}>
                    Preview
                    <hr />
                </div>
        
                <div className={`h-full overflow-y-auto scrollbar_thin ${!context.editState ? 'w-full px-64' : 'pr-12'}`}>
                    <div className="text-xl">
                        { note.title }
                    </div>
                    <div className={`is_markdown`} >
                    {
                        parse(converter.makeHtml(note.body))
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}