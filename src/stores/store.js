import {configureStore} from "@reduxjs/toolkit";
import uiReducer from "./UI/uiSlice";
export default configureStore({
  reducer: {
    ui: uiReducer
  },
});