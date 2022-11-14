import { AppContext } from "contexts/AppContext";
import { useContext } from "react";

export default function StatusBarPreviewEditTab() {
    const context = useContext(AppContext)

    if (context.currentNote == null) {
        //return
    }

    const setState = function(value, requiredState) {
        
        if (requiredState === context.editState) {
            context.setEditState(value)
        }
    }

    return (
        <div className="lg:text-md flex flex-row gap-4">
            <div onClick={ () => { setState(false, true) } }
            className={`transition-all ${context.editState ? "text-zinc-500 cursor-pointer" : "text-white underline underline-offset-8 decoration-2"}`}>
                Preview
            </div>
            <div onClick={ () => { setState(true, false) } }
            className={`transition-all ${context.editState ? "text-white underline underline-offset-8 decoration-2" : "text-zinc-500 cursor-pointer"}` }>
                Edit
            </div>
        </div>
    )
}