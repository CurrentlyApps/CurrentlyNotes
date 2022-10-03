

export default function Editor(props) {

    const updateTitle = function(event){
        let tempNote = { ...props.note, title: event.target.value }
        props.updateNote(tempNote)
    }

    const updateBody = function(event) {
        let tempNote = { ...props.note, body: event.target.value }
        props.updateNote(tempNote)
    }
    return (
        <div className="container w-full h-full mx-auto px-96 py-10">
            
            <input 
            className="w-full text-lg border-none outline-none focus:ring-0 font-semibold"
            value={ props.note.title }
            onChange={ updateTitle }
            placeholder="Title"
            type="text" />
            
            <textarea
            className="w-full h-full text-lg border-none outline-none focus:ring-0"
            value={ props.note.body }
            onChange={ updateBody }
            placeholder="Insert Text Here"
            type="text" />
        </div>
    )
}