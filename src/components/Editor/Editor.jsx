import { AppContext } from "contexts/AppContext";
import { useContext } from "react";
import { Outlet } from "react-router-dom";




export default function Editor() {
    const context = useContext(AppContext)
    
    return (
        <div className={`pt-5 flex lg:flex-row flex-col transition-all h-full overflow-hidden ${context.extended ? 'lg:w-4/5 w-1/5' : 'w-full'}`}>
            <Outlet/>
        </div>
    )
}