import {Button, Modal, Spinner, ToggleSwitch, Tooltip} from "flowbite-react";
import {useEffect, useState} from "react";
import {  getShareableLink } from "services/noteSharing";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "stores/UI/uiModals";
import {QuestionMarkCircleIcon} from "@heroicons/react/24/outline";
import SharingSubForm from "./SharingSubForm";
import firebaseSharingService from "services/firebaseSharingService";
import {addPopup} from "stores/UI/globalPopupSlice";

export default function SharingModal() {
    const dispatch = useDispatch();
    const note_meta = useSelector((state) => state.uiModal.modalData);

    const [collaborateEnabled, setCollaborateEnabled] = useState(false);
    const [collaborateUsers, setCollaborateUsers] = useState([]);

    const [publishEnabled, setPublishEnabled] = useState(false);
    const [publishUsers, setPublishUsers] = useState([]);
    const [publishAllowPublic, setPublishAllowPublic] = useState(true);


    function copyShareLinkToClipboard(privacy) {
      const link = getShareableLink(note_meta, privacy)
      navigator.clipboard.writeText(link).then(() => {
        dispatch(addPopup({
          type: 'success',
          title: 'Copied to clipboard',
          message: 'The shareable link has been copied to your clipboard.',
        }));
      });
    }

    const saveChanges = () => {
      setSaveLoading(true);
      const shareSettings = {
        canCollab: collaborateEnabled,
        canPublish: publishEnabled,
        allowPublishPublic: publishAllowPublic,
        allowCollabPublic: false,
        collabUsers: collaborateUsers,
        publishUsers: publishUsers,
        noteMeta: note_meta
      }
      firebaseSharingService.updateNoteShareSettings(shareSettings, () => {
        setSaveLoading(false);
        dispatch(closeModal());
      });
    }
    const [saveLoading, setSaveLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      firebaseSharingService.getNoteShareOptions(note_meta, (note_share) => {
        setCollaborateEnabled(note_share.canCollab);
        setCollaborateUsers(note_share.collabUsers ? Object.values(note_share.collabUsers) : []);
        setPublishEnabled(note_share.canPublish);
        setPublishUsers(note_share.publishUsers ? Object.values(note_share.publishUsers) : []);
        setPublishAllowPublic(note_share.allowPublishPublic);
        setIsLoading(false);
      });
    }, [note_meta]);

    function renderBody() {
      return (
        <>
          <div className={"font-semibold"}>
            Sharing Options
          </div>
          <div className={"mt-4"}>
            <div className={"flex flex-row pb-2"}>
              <div className={"mr-auto text-lg"}>
                <Tooltip content="Users will be able to read and modify this note">
                  <div className={"flex flex-row font-semibold"}>
                    Collaborate
                    <QuestionMarkCircleIcon className={"w-5 ml-1"}/>
                  </div>
                </Tooltip>
              </div>
              <ToggleSwitch checked={collaborateEnabled} label={" "} size={"sm"} onChange={(prev) => {setCollaborateEnabled(prev)}}/>
            </div>

            { collaborateEnabled ?
            <>
              Click to copy:
              <input
                readOnly={true}
                className={"w-full text-zinc-600 border-2 rounded-lg p-2 mb-2"}
                value={getShareableLink(note_meta, 'collab')}
                onClick={() => {copyShareLinkToClipboard('collab')}}
                placeholder={"Link here"}
              />

              <SharingSubForm form={collaborateUsers} setForm={setCollaborateUsers}/>
            </> : "" }
            <hr className={"my-3 border-zinc-800"}/>
            <div className={"flex flex-row pb-2"}>
              <div className={"mr-auto text-lg"}>
                <Tooltip content="Users will only be able to view the formatted note.">
                  <div className={"flex flex-row font-semibold"}>
                    Publish
                    <QuestionMarkCircleIcon className={"w-5 ml-1"}/>
                  </div>
                </Tooltip>
              </div>
              <ToggleSwitch checked={publishEnabled} label={" "} size={"sm"} onChange={(prev) => {setPublishEnabled(prev)}}/>
            </div>
            { publishEnabled ?
              <>
                Click to copy:
                <input
                  readOnly={true}
                  className={"w-full text-zinc-600 border-2 rounded-lg p-2 mb-2"}
                  value={getShareableLink(note_meta, 'publish')}
                  onClick={() => {copyShareLinkToClipboard('publish')}}
                  placeholder={"Link here"}
                />
                <div className={"flex flex-row my-3"}>
                  <div className={"mr-auto text-sm"}>
                    Allow anyone with the link to view this note
                  </div>
                  <ToggleSwitch checked={publishAllowPublic} label={" "} onChange={(prev) => {setPublishAllowPublic(prev)}}/>
                </div>
                {
                  publishAllowPublic ? "" : <SharingSubForm form={publishUsers} setForm={setPublishUsers}/>
                }
              </>
              : ""}
          </div>


          <Button onClick={() => saveChanges()}>
            {
              saveLoading ?
                <Spinner />
                :
                "Save Changes"
            }
          </Button>
        </>
      )
    }

    return (
      <Modal
        show={true}
        onClose={() => dispatch(closeModal())}
        popup={true}
        size={"xl"}>
        <Modal.Header/>
        <Modal.Body>
          <div className="modalBody">
            {
              isLoading ?
                <div className={"text-center"}>
                  <Spinner size={"lg"}/>
                </div>
                :
                renderBody()
            }
          </div>
        </Modal.Body>
      </Modal>
    )
}