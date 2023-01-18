import {Avatar, Dropdown} from "flowbite-react";
import LoginOrProfile from "./LoginOrProfile";
import {ArrowRightOnRectangleIcon, Cog6ToothIcon, HomeModernIcon, UserIcon} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {openModal} from "stores/UI/uiModals";
import authService from "services/firebaseAuthService";
import { getFunctions, httpsCallable} from "firebase/functions";
export default function StatusBarDropDown() {
    const user = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const isOnline = useSelector(state => state.firebase.isOnline);

    const functions = getFunctions();
    const shareNoteToUser = httpsCallable(functions, 'shareNoteToUser');

    const handleShareNote = () => {
        shareNoteToUser({
            canCollab: true,
            canPublish: true,
            allowPublishPublic: true,
            allowCollabPublic: false,
            collabUsers: ['orange.grass.850@example.com'],
            publishUsers: [],
            noteMeta: {
                created_at: 1673777488490,
                id: '0',
                title: 'test',
                user_id: 'uDzAxJxrIem7HY8sRIo0Wedg1H4H',
            }
        });
    }

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
                            <Dropdown.Item onClick={ ()=>handleShareNote()}>
                                <Cog6ToothIcon className={"w-4 mr-2"} />
                                App Settings
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