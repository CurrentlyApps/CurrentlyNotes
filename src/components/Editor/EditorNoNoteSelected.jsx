import { AppContext } from "contexts/AppContext"
import { useContext } from "react"

export default function EditorNoNoteSelected() {
    const context = useContext(AppContext)
    return (
        <div className="pt-10 w-full grow lg:py-4 text-zinc-500 text-center lg:w-4/5 "> 
        {
            context.user
            ? 'Select a note on the left, or create a new one!'
            : 'Login now to get started!'
        }
        </div>   
    )
}