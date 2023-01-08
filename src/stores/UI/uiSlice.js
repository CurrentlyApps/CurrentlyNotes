import {createSlice} from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    sidebarExtended: true,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarExtended = !state.sidebarExtended;
    }
  },
});

export const {toggleSidebar} = uiSlice.actions;
export default uiSlice.reducer;