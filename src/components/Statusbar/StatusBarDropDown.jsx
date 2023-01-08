import { Dropdown } from "flowbite-react";
import LoginOrProfile from "components/Auth/LoginOrProfile";
import {ArrowRightOnRectangleIcon, Cog6ToothIcon, HomeModernIcon, UserIcon} from "@heroicons/react/24/outline";
import { useSelector} from "react-redux";
import {signOutClick} from "../../services/firebase";

export default function StatusBarDropDown() {
    const user = useSelector(state => state.auth);

    return (
        <div className="my-auto p-0">
            <Dropdown label={ user ? user.displayName : 'Not Logged In'} inline={true}>
                <Dropdown.Header>
                    <LoginOrProfile/>
                </Dropdown.Header>
                <Dropdown.Item>
                    <HomeModernIcon className="w-4 mr-2"/>
                    <a href="https://www.currentlynotes.com/">Homepage</a>
                </Dropdown.Item>
                {!user.isSignedIn
                        ? ""
                        :
                        <>
                            <Dropdown.Item>
                                <UserIcon className="w-4 mr-2"/>
                                Account Settings
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Cog6ToothIcon className={"w-4 mr-2"} />
                                App Settings
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item  onClick={ () => {signOutClick()}}>
                                <ArrowRightOnRectangleIcon className={"w-4 mr-2"}/>
                                Sign out
                            </Dropdown.Item>
                        </>
                }
            </Dropdown>
        </div>
    )
}