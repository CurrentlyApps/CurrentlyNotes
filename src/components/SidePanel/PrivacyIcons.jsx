
import { EyeIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "flowbite-react";

export default function PrivacyIcons(props) {
    const note = props.note;
    const commonClass = "w-4 mt-1  ml-auto"


    if (note.privacy === "public") {
        return (
            <Tooltip content='Public'>
                <EyeIcon className={commonClass} />
            </Tooltip>
        )
    }
    return ("")
}