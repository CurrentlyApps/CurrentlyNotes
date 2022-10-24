import { useContext } from "react"
import { updateNote } from "../../services/firebase"
import { AppContext } from "../Home"
import parse from 'html-react-parser';
import Showdown from "showdown";

const converter = new Showdown.Converter()


export default function Editor(props) {
    const context = useContext(AppContext)

    const updateTitle = function(event){
        let tempNote = { ...props.note, title: event.target.value }
        updateNote(tempNote, context)
    }

    const updateBody = function(event) {
        let tempNote = { ...props.note, body: event.target.value }
        updateNote(tempNote, context)
    }

    if (context.currentNote === null) {
        return (
            <div className="pt-10 grow lg:py-4 text-zinc-500 text-center lg:w-4/5 w-1/5"> 
              {
                context.user
                ? 'Select a note on the left, or create a new one!'
                : 'Login now to get started!'
              }
            
             </div>
        )
    }
    else {
        return (
            <div className={`pt-5 flex lg:flex-row flex-col transition-all h-full overflow-hidden ${context.extended ? 'lg:w-4/5 w-1/5' : ''}`}>
                {
                    context.editState === true &&
                    <>
                        <div className="flex flex-col lg:w-1/2 w-full lg:pl-20 lg:px-5 pl-4 pr-1 lg:h-full h-1/2 resize-y">
                            <div className="font-light">
                                Edit Markup
                                <hr />
                            </div>
                            <input 
                            className="w-full text-lg border-none outline-none focus:ring-0 font-semibold"
                            value={ props.note.title }
                            onChange={ updateTitle }
                            placeholder="Title"
                            type="text" />
                            
                            <textarea
                            className="h-full border-none outline-none focus:ring-0 overflow-auto scrollbar_thin resize-none"
                            value={ props.note.body }
                            onChange={ updateBody }
                            placeholder="Insert Text Here"
                            type="text" />
                        </div>
                    </>
                }
                <div className={`transition-all lg:px-14 pl-4   flex flex-col ${!context.editState ? 'w-full h-full' : 'lg:w-1/2 lg:h-full h-1/2'}`}>
                    <div className="font-light">
                        Preview
                        <hr />
                    </div>
            
                    <div className={`h-full overflow-y-auto scrollbar_thin ${!context.editState ? 'w-full' : ''}`}>
                        <div className="font-semibold text-lg">
                            { props.note.title }
                        </div>
                        <div className="is_markdown ">
                        {
                            parse(converter.makeHtml(props.note.body))
                        }
                        </div>
                    </div>
                </div>
                
                
            </div>
        )
    }
}