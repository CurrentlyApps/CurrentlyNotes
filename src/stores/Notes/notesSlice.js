import {createSlice} from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    note_meta: {},
    note_content: {},
    currentNote: null,
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload;
    },

    setNote: (state, action) => {
      state.currentNote = action.payload;
    },

    setNoteMeta: (state, action) => {
      state.note_meta = action.payload;
    },

    setNoteContent: (state, action) => {
      state.note_content = action.payload;
    }
  }
});

export const {setNotes, setNote, setNoteMeta, setNoteContent} = notesSlice.actions;
export default notesSlice.reducer;