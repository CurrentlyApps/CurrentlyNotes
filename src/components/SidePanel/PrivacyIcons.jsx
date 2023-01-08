
import { EyeIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "flowbite-react";
import { copyShareableLink } from "services/noteSharing";

export default function PrivacyIcons(props) {
    const note = props.note;
    const commonClass = "w-4 mt-1 ml-auto cursor-pointer"


    if (note.privacy === "public") {
        return (
            <Tooltip content='Copy Link' >
                <EyeIcon className={commonClass} onClick={() => copyShareableLink( note)} />
            </Tooltip>
        )
    }
    return ("")
}