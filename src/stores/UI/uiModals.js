import {createSlice} from "@reduxjs/toolkit";

export const uiModalSlice = createSlice({
  name: "uiModal",
  initialState: {
    modal: null,
    modalData: null
  },
  reducers: {
    openModal: (state, action) => {
      state.modal = action.payload;
    },

    closeModal: (state) => {
      state.modal = null;
      state.modalData = null;
    },

    setModalData: (state, action) => {
      state.modalData = action.payload;
    }
  }
});

export const {openModal, closeModal, setModalData} = uiModalSlice.actions;
export default uiModalSlice.reducer;