import { AppContext } from "contexts/AppContext";
import { Button, Label, Modal, Radio, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { setNotePrivacy, getShareableLink } from "services/noteSharing";

export default function SharingModal() {
    const context = useContext(AppContext);
    const [copyConfirmHidden, setCopyConfirmHidden] = useState(true);

    if (context.modalShareNote === null) {
        return 
    }
    const note = context.noteList[context.modalShareNote]
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
                <Radio type="radio"  id={val} name="privacy" value={val} defaultChecked={ notePrivacy === val ? true :false } />
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
        context.setModalShareNote(null)
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
            <Modal show={note != null} onClose={onClose}>
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