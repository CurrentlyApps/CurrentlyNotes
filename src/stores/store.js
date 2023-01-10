import {configureStore} from "@reduxjs/toolkit";
import uiReducer from "./UI/uiSlice";
import uiModalReducer from "./UI/uiModals";
import authReducer from "./Auth/authSlice";
import notesReducer from "./Notes/notesSlice";
import globalPopUpSliceReducer from "./UI/globalPopupSlice";

export default configureStore({
  reducer: {
    ui: uiReducer,
    uiModal: uiModalReducer,
    auth: authReducer,
    notes: notesReducer,
    globalPopup: globalPopUpSliceReducer,
  },
});