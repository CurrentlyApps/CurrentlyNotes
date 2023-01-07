import { AppContext } from "contexts/AppContext";
import { Dropdown } from "flowbite-react";
import { useContext } from "react";
import { signOutClick } from "services/firebase";
import LoginOrProfile from "components/Auth/LoginOrProfile";

export default function StatusBarDropDown() {  
    const context = useContext(AppContext)

    return (
        <div className="my-auto p-0">
            <Dropdown label={ context.user ? context.user.displayName : 'Not Logged In'} inline={true}>
                <Dropdown.Header>
                    <LoginOrProfile/>
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