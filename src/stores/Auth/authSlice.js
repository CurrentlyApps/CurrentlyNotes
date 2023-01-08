import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isSignedIn: false,
    displayName: "",
    photoURL: "",
    email: "",
  },
  reducers: {
    setUserData: (state, action) => {
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
      state.isSignedIn = true;
    },

    logout: (state) => {
      state.isSignedIn = false;
      state.displayName = "";
      state.photoURL = "";
      state.email = "";
    }
  }
});

export const { setUserData, logout} = authSlice.actions;
export default authSlice.reducer;