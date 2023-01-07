import { AppContext } from "contexts/AppContext";
import { Dropdown } from "flowbite-react";
import { useContext } from "react";
import { signOutClick } from "services/firebase";
import LoginOrProfile from "components/Auth/LoginOrProfile";
import {ArrowRightOnRectangleIcon, Cog6ToothIcon, HomeModernIcon, UserIcon} from "@heroicons/react/24/outline";

export default function StatusBarDropDown() {  
    const context = useContext(AppContext)

    return (
        <div className="my-auto p-0">
            <Dropdown label={ context.user ? context.user.displayName : 'Not Logged In'} inline={true}>
                <Dropdown.Header>
                    <LoginOrProfile/>
                </Dropdown.Header>
                <Dropdown.Item>
                    <HomeModernIcon className="w-4 mr-2"/>
                    <a href="https://www.currentlynotes.com/">Homepage</a>
                </Dropdown.Item>
                {
                    context.user == null
                        ? ""
                        :
                        <>
                            <Dropdown.Item>
                                <UserIcon className="w-4 mr-2"/>
                                Account Settings
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Cog6ToothIcon class={"w-4 mr-2"} />
                                App Settings
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item  onClick={ () => {signOutClick(context)} }>
                                <ArrowRightOnRectangleIcon class={"w-4 mr-2"}/>
                                Sign out
                            </Dropdown.Item>
                        </>
                }
            </Dropdown>
        </div>
    )
}