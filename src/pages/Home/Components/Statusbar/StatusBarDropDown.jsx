import {Avatar, Dropdown} from "flowbite-react";
import LoginOrProfile from "./LoginOrProfile";
import {ArrowRightOnRectangleIcon, HomeModernIcon, UserIcon} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {openModal} from "stores/UI/uiModals";
import authService from "services/firebaseAuthService";
export default function StatusBarDropDown() {
    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const isOnline = useSelector(state => state.firebase.isOnline);

    return (
        <div className="my-auto p-0">
            <Dropdown label={
                <Avatar img={user.photoURL} size={"sm"} rounded={true} status={isOnline ? '' : 'busy'}>
                    <div className="text-sm font-medium dark:text-white">
                        <div className={"text-left"}>
                            { user.displayName }
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            { user.email === user.displayName ? "" : user.email }
                        </div>
                    </div>
                </Avatar>
            } inline={true}>
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
                            <Dropdown.Item onClick={ () => dispatch(openModal('AccountSettings'))}>
                                <UserIcon className="w-4 mr-2"/>
                                Account Settings
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item  onClick={ () => {authService.signOut()}}>
                                <ArrowRightOnRectangleIcon className={"w-4 mr-2"}/>
                                Sign out
                            </Dropdown.Item>
                        </>
                }
            </Dropdown>
        </div>
    )
}