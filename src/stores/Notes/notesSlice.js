import {createSlice} from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    currentNote: null,
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },

    setNote: (state, action) => {
      state.currentNote = action.payload;
    }
  }
});

export const {setNotes, setNote} = notesSlice.actions;
export default notesSlice.reducer;