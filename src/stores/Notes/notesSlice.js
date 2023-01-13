import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    notes: [],
    note_meta: {},
    note_content: {},
}

export const notesSlice = createSlice({
  name: "notes",
  initialState: initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },


    setNoteMeta: (state, action) => {
      state.note_meta = action.payload;
    },

    setNoteContent: (state, action) => {
      state.note_content = action.payload;
    },

    resetState: (state) => {
      state.notes = [];
      state.note_meta = {};
      state.note_content = {};
    }
  }
});

export const {setNotes, setNote, setNoteMeta, setNoteContent, resetState} = notesSlice.actions;
export default notesSlice.reducer;