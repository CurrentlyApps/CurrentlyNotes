import {createSlice} from "@reduxjs/toolkit";
export const firebaseSlice = createSlice({
  name: "firebase",
  initialState: {
    isOnline: true,
  },
  reducers: {
    setIsOnline: (state, action) => {
      state.isOnline = action.payload;
    }
  },
});

export const {setIsOnline} = firebaseSlice.actions;
export default firebaseSlice.reducer;