import {configureStore} from "@reduxjs/toolkit";
import uiReducer from "./UI/uiSlice";
import uiModalReducer from "./UI/uiModals";
export default configureStore({
  reducer: {
    ui: uiReducer,
    uiModal: uiModalReducer
  },
});