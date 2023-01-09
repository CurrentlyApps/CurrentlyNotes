import { Button, Label, Modal, Radio, TextInput } from "flowbite-react";
import { useState } from "react";
import { setNotePrivacy, getShareableLink } from "services/noteSharing";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "stores/UI/uiModals";

export default function SharingModal() {
    const dispatch = useDispatch();
    const modalTitle = useSelector((state) => state.uiModal.modal);
    const noteId = useSelector((state) => state.uiModal.modalData);
    const [copyConfirmHidden, setCopyConfirmHidden] = useState(true);
    const notes = useSelector((state) => state.notes.notes);

    if (modalTitle !== "ShareOptions") {
        return
    }

    const note = notes[noteId]
    const notePrivacy = note.privacy;
    const shareableLink = getShareableLink(note);
    
    const values = ["private", "public", "collaborate"];
    const radioButtonGroup1 = []
    if (!notePrivacy) {
        setNotePrivacy(note, 'Private')
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
        setNotePrivacy( note, event.target.value)
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
      <Modal
        show={true}
        onClose={onClose}
        popup={true}
        size={"md"}>
        <Modal.Header/>
        <Modal.Body>
          <div className="modalBody">
            <div className={"font-semibold"}>
              Sharing Options
            </div>
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
              <Button onClick={onClose}>
                Close
              </Button>
          </div>
        </Modal.Body>
      </Modal>
    )
}