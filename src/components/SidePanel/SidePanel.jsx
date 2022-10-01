export default function SidePanel(props) {

    
    return (
        <div className="w-64 bg-zinc-200 h-screen">
            <div className="font-bold p-4 text-xl">
                Current
            </div>
            <hr />
            {
                noteList(props.notes, props.noteClicked)
            }
        </div>
    )
}

function noteList(list, noteClicked) {
    let listElement = [];
    list.forEach(note => {
        listElement.push(
            <div onclick="noteClicked(note.id)" className="font-bold text-slate-700 px-4 py-2">{ note.title} </div>
        )
    });
    return listElement
}