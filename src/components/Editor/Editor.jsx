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
    return (
        <div className="flex lg:flex-row flex-col w-full h-full transition-all duration-150 lg:py-4">
            {
                context.editState === true &&
                <>
                    <div className="flex flex-col w-full h-full lg:pl-20 px-5 overflow-y-auto">
                        <div className="font-light">
                            Markup
                            <hr />
                        </div>
                        <input 
                        className="w-full text-lg border-none outline-none focus:ring-0 font-semibold"
                        value={ props.note.title }
                        onChange={ updateTitle }
                        placeholder="Title"
                        type="text" />
                        
                        <textarea
                        className="w-full h-full text-lg border-none outline-none focus:ring-0 "
                        value={ props.note.body }
                        onChange={ updateBody }
                        placeholder="Insert Text Here"
                        type="text" />
                    </div>
                    <div className="lg:h-full lg:w-0.5 w-full border-t-2 lg:border-r-2" />
                </>
            }
            <div className="container w-full h-full mx-auto px-5 lg:px-20 overflow-y-auto">
                {
                    context.editState === true &&
                    <div className="font-light">
                        Preview
                        <hr />
                    </div>
                }
                <div className="font-semibold text-lg">
                    { props.note.title }
                </div>
                <div className="text-lg">
                {
                    parse(converter.makeHtml(props.note.body))
                }
                </div>
            </div>
            
            
        </div>
    )
}