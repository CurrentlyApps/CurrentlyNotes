import { useContext } from "react"
import { AppContext } from 'contexts/AppContext';
import { Bars3Icon } from "@heroicons/react/24/solid"
import StatusBarDropDown from "./StatusBarDropDown";
import StatusBarPreviewEditTab from "./StatusBarPreviewEditTab";

export default function Statusbar() {
    const context = useContext(AppContext)
    
    return (
        <div className="w-full text-zinc-200 bg-zinc-900 lg:px-4 px-2 py-2 flex justify-between">
            <div className="lg:font-extrabold lg:w-1/3 lg:text-lg mr-auto flex flex-row cursor-pointer" onClick={ () => { context.setExtendedState(!context.extended) } }>
                <div className="py-auto align-middle my-auto mr-1 tracking-widest uppercase hidden lg:block">Currently</div>
                <Bars3Icon className={`${context.extended ? 'rotate-180' : ''} transition-all w-7 h-7 my-auto lg:ml-2`} />
            </div>

            <div className="mx-auto flex justify-center w-1/3">
                <StatusBarPreviewEditTab />
            </div>

            <div className="lg:flex hidden w-1/3 justify-end ">
                { context.user ? <img className="w-9 h-9 rounded-full mr-4" src={context.user.photoURL} alt="Rounded avatar"/> : ''}
                <StatusBarDropDown />
            </div>
        </div>
    )
}