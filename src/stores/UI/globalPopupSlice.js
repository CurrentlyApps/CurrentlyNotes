import {createSlice} from "@reduxjs/toolkit";
export const globalPopUpSlice = createSlice({
  name: "globalPopUp",
  initialState: {
    popups: {

    }
  },
  reducers: {

    addPopup: (state, action) => {
      let key = Object.keys(state.popups).length;
      state.popups[key] = action.payload;
    },

    removePopup: (state, action) => {
      delete state.popups[action.payload];
    }
  },
});

export const {addPopup, removePopup} = globalPopUpSlice.actions;
export default globalPopUpSlice.reducer;