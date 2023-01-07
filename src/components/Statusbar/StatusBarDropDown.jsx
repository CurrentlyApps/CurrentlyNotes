import { AppContext } from "contexts/AppContext";
import { Dropdown } from "flowbite-react";
import { useContext } from "react";
import { signIn, signOutClick } from "services/firebase";

export default function StatusBarDropDown() {  
    const context = useContext(AppContext)

    return (
        <div className="my-auto p-0">
            <Dropdown label={ context.user ? context.user.displayName : 'Not Logged In'} inline={true}>
                <Dropdown.Header>
                    { 
                        context.user == null
                        ? <div className="cursor-pointer text-md py-2" onClick={ () => {signIn(context)} }> Login</div>
                        : <div className="dropDown">
                            <div className="flex flex-row">
                                <div className="hidden lg:block">{ context.user.displayName }</div>
                            </div>
                            <span className="block text-sm font-medium truncate">
                                { context.user.email }
                            </span>
                        </div>
                    }
                    
                </Dropdown.Header>
                <Dropdown.Item>
                    <a href="https://www.currentlynotes.com/">Homepage</a>
                </Dropdown.Item>
                {
                    context.user == null
                        ? ""
                        :
                        <>
                            <Dropdown.Item>
                                Settings
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item  onClick={ () => {signOutClick(context)} }>
                                Sign out
                            </Dropdown.Item>
                        </>
                }
            </Dropdown>
        </div>
    )
}