import { useContext, useEffect, useState } from "react"
import { db, updateNote } from "services/firebase"
import { AppContext } from 'contexts/AppContext';
import parse from 'html-react-parser';
import Showdown from "showdown";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { off, onValue, ref } from "firebase/database";

export default function EditorNote() {
    let navigate = useNavigate();
    const converter = new Showdown.Converter()
    const context = useContext(AppContext)
    const { user_id, post_id } = useParams();

    const [showPreview, setShowPreview] = useState(true)

    const updateBody = function(event) {
        let tempNote = { ...context.note, body: event.target.value }
        updateNote(tempNote, user_id)
    }

    let setNote = context.setNote;

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

    const [loadingNote, setLoadingNote] = useState(true);

    useEffect( () => {
        const notesRef = ref(db, `/notes/users/${user_id}/notes/${post_id}`);
        onValue(notesRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                navigate("/edit/error");
            }
            setLoadingNote(false);
            setNote(data);
            if( data ) {
                document.title = data.title + " - Currently Notes";
            } else {
                document.title = "Currently Notes";
            }
        }, () => {
            navigate("/edit/error");
        });
        return () => {
            off(notesRef)
        }
    }, [post_id, user_id, navigate, setNote]);

    if ( loadingNote ) {
        return (
            <div className={`mx-auto pt-28`}>
                <Spinner aria-label="Loading Note" size="xl" />
            </div>
        )
    }

    return (
        <div className={`flex lg:flex-row flex-col transition-all h-full overflow-hidden ${context.extended ? 'lg:w-full w-1/5' : 'w-full'}`}>
            <div className="flex flex-col lg:w-1/2 w-full px-4 lg:h-full h-1/2 resize-y">
                <div className="font-light px-4">
                    <div className={"flex flex-row"}>
                        <div className="">
                            <button onClick={() => setShowPreview((prevState) => {return !prevState })} className="text-zinc-700 hover:text-zinc-600">
                                Toggle Preview
                            </button>
                        </div>
                    </div>
                    <hr />
                </div>

                <textarea
                    onKeyDown={ handleTab }
                    className="h-full border-none outline-none focus:ring-0 overflow-auto px-4 scrollbar_thin"
                    value={ context.note.body }
                    onChange={ updateBody }
                    placeholder="Insert Text Here"
                />
            </div>
            {
                showPreview === true
                    ?
                    <div className={`transition-all flex flex-col ${!context.editState ? 'w-full h-full' : 'lg:w-1/2 lg:h-full h-1/2'}`}>
                        <div className={`font-light  ${!context.editState ? 'w-full lg:px-64 px-2' : 'px-2'}`}>
                            Preview
                            <hr />
                        </div>

                        <div className={`h-full overflow-y-auto scrollbar_thin  ${!context.editState ? 'w-full lg:px-64 px-2' : 'px-2'}`}>
                            <div className="text-xl">
                                { context.note.title }
                            </div>
                            <div className={`is_markdown`} >
                                {
                                    parse(converter.makeHtml(context.note.body))
                                }
                            </div>
                        </div>
                    </div>
                : ""

            }
        </div>
    )
}