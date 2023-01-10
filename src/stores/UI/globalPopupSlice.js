import {createSlice} from "@reduxjs/toolkit";
export const globalPopUpSlice = createSlice({
  name: "globalPopUp",
  initialState: {
    popups: {

    }
  },
  reducers: {

    addPopup: (state, action) => {
      state.popups[action.payload.id] = action.payload;
    },

    removePopup: (state, action) => {
      delete state.popups[action.payload];
    }
  },
});

export const {addPopup, removePopup} = globalPopUpSlice.actions;
export default globalPopUpSlice.reducer;