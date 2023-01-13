import {createSlice} from "@reduxjs/toolkit";
export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    sidebarExtended: true,
    isSavingData: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarExtended = !state.sidebarExtended;
    },
    setIsSavingData: (state, action) => {
      state.isSavingData = action.payload;
    }
  },
});

export const {toggleSidebar, setIsSavingData} = uiSlice.actions;
export default uiSlice.reducer;