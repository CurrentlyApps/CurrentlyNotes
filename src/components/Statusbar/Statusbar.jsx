import { useContext } from "react"
import { AppContext } from "../Home"
import { signIn, signOutClick } from "../../services/firebase"

export default function Statusbar() {
    const context = useContext(AppContext)
    const setState = function(value, requiredState) {
        if (requiredState === context.editState) {
            context.setEditState(value)
        }
    }
    return (
        <div className="w-full h-30 text-white bg-black px-4 py-2 flex justify-between">
            <div className="lg:font-extrabold w-1/3 text-lg mr-auto flex flex-row cursor-pointer" onClick={ () => { context.setExtendedState(!context.extended) } }>
                <div className="py-auto align-middle py-auto my-auto mr-5 tracking-widest uppercase">Current</div>
             
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${context.extended ? 'rotate-180' : ''} transition-all w-5 h-5 my-auto ml-2`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>

            </div>

            <div className="mx-auto flex justify-center w-1/3 my-auto">
                {
                    context.currentNote == null
                    ? ""
                    :
                    <div className="text-md flex flex-row gap-4">
                        <div
                        onClick={ () => { setState(false, true) } }
                        className={`${context.editState ? "text-zinc-500 cursor-pointer" : "text-white"}`}>
                            View
                        </div>
                        <div
                        onClick={ () => { setState(true, false) } }
                        className={`${context.editState ? "text-white" : "text-zinc-500 cursor-pointer"}` }>
                            Edit
                        </div>
                    </div>
                }
            </div>

            <div className="w-1/3 mr-3 flex justify-end ">
                <div className="lg:flex hidden">
                { context.user == null
                 ? <div className="cursor-pointer text-sm text-white py-2" onClick={ () => {signIn(context)} }> Login</div>
                 : <div className="dropDown">
                    <div className="hidden lg:block py-2">{ context.user.displayName }</div>
                    <div className="block md:hidden py-2"> o </div>
                    <div className="dropDownContent w-full">
                        <div className="cursor-pointer text-sm text-black" onClick={ () => {signOutClick(context)} }>Logout</div>
                    </div>
                   </div>
                }
                </div>
            </div>
        </div>
    )
}