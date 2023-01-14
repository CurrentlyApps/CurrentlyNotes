import {Alert} from "flowbite-react";
import {createPortal} from "react-dom";
import {useDispatch, useSelector} from "react-redux";
import {removePopup} from "../../stores/UI/globalPopupSlice";

export default function Element() {
  const dispatch = useDispatch();
  const popups = useSelector((state) => state.globalPopup.popups);

  const toRender = [];

  for (let key in popups) {
    let popup = popups[key];
    toRender.push(
      <Alert
        withBorderAccent={true}
        rounded={false}
        key={key}
        onDismiss={() => { dispatch(removePopup(key)) } }>
        <span className={"p-2"}>
          <span className="font-medium">
            { popup.title }
          </span>
          {' ' + popup.message }
        </span>
      </Alert>
    );
  }

  return createPortal(
    <div id={"popupContainer"} className={"fixed top-0 m-auto space-y-4 mt-4 inset-x-0 mx-auto w-fit z-[100]"}>
      {toRender}
    </div>,
    document.body
  )
}

