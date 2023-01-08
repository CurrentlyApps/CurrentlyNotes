import {configureStore} from "@reduxjs/toolkit";
import uiReducer from "./UI/uiSlice";
import uiModalReducer from "./UI/uiModals";
import authReducer from "./Auth/authSlice";
import notesReducer from "./Notes/notesSlice";

export default configureStore({
  reducer: {
    ui: uiReducer,
    uiModal: uiModalReducer,
    auth: authReducer,
    notes: notesReducer,
  },
});