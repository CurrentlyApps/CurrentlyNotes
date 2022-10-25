import { AppContext } from "contexts/AppContext";
import { Button, Label, Modal, Radio } from "flowbite-react";
import { useContext } from "react";

export default function SharingModal() {
    const context = useContext(AppContext)

    return (
        <div>
            <Modal show={context.modalShareActive}>
                <Modal.Header>
                    Sharing Features
                </Modal.Header>
                <Modal.Body>
                    <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                            <Radio
                            id="public"
                            name="privacy"
                            value="public"
                            />
                            <Label htmlFor="public">
                                Public
                            </Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <Radio
                            id="Private"
                            name="privacy"
                            value="Private"
                            />
                            <Label htmlFor="Private">
                                Private
                            </Label>
                        </div>

                        <div className="flex items-center gap-2">
                            <Radio
                            id="Collaborate"
                            name="privacy"
                            value="Collaborate"
                            />
                            <Label htmlFor="Collaborate">
                                Collaborate
                            </Label>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button >
                        I accept
                    </Button>
                    <Button color="gray">
                        Decline
                    </Button>
                </Modal.Footer>   

            </Modal>
        </div>
    )
}