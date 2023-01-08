import { AppContext } from "contexts/AppContext";
import { Button, Label, Modal, Radio, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { setNotePrivacy, getShareableLink } from "services/noteSharing";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "stores/UI/uiModals";

export default function SharingModal() {
    const context = useContext(AppContext);
    const dispatch = useDispatch();
    const modalTitle = useSelector((state) => state.uiModal.modal);
    const noteId = useSelector((state) => state.uiModal.modalData);
    const [copyConfirmHidden, setCopyConfirmHidden] = useState(true);

    if (modalTitle !== "ShareOptions") {
        return
    }


    const note = context.noteList[noteId]
    const notePrivacy = note.privacy;
    const shareableLink = getShareableLink(context, note);
    
    const values = ["private", "public", "collaborate"];
    const radioButtonGroup1 = []
    if (!notePrivacy) {
        setNotePrivacy(context, note, 'Private')
    }
    values.forEach((val) => {
        radioButtonGroup1.push(
            <div key={val} className="flex items-center gap-2">
                <Radio type="radio"  id={val} name="privacy" value={val} defaultChecked={ notePrivacy === val } />
                <div className="capitalize">
                    { val }
                </div>
            </div>
        )
    });


    const onPrivacyChange = function(event) {
        setNotePrivacy(context, note, event.target.value)
    }

    const onClose = function() {
        dispatch(closeModal());
    }

    function copyShareLinkToClipboard() {
        navigator.clipboard.writeText(shareableLink)
        setCopyConfirmHidden(false);
        setTimeout(() => {
            setCopyConfirmHidden(true);
        }, 5000)
    } 

    

    return (
        <div>
            <Modal show={true} onClose={onClose}>
                <Modal.Header>
                    Sharing Options
                </Modal.Header>
                <Modal.Body>
                    <div className="flex justify-between" onChange={onPrivacyChange}>
                        { radioButtonGroup1 }
                    </div>

                    {
                        note.privacy === "public" &&
                        <div className="my-5">
                            <div className="flex flex-row">
                                <Label htmlFor="shareLink">
                                    Share Link
                                </Label>
                                <div className="transition-all ml-auto text-sm text-green-500" hidden={copyConfirmHidden}>
                                    Link copied to clipboard
                                </div>
                            </div>
                            <TextInput onClick={copyShareLinkToClipboard} value={shareableLink} readOnly={true} id="shareLink" />
                        </div>
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose}>
                        Close
                    </Button>
                </Modal.Footer>   

            </Modal>
        </div>
    )
}