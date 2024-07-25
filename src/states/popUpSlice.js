import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showToast: false,
  toastMessage: "",
  toastStatus: "default",
  showModal: false,
  modalContent: null,
chatBotOpen: false,
};

const popUpSlice = createSlice({
  name: "popUp",
  initialState,
  reducers: {
    showToast(state, action) {
      state.showToast = true;
      state.toastMessage = action.payload.message;
      state.toastStatus = action.payload.status || "default";
    },

    hideToast(state) {
      state.showToast = false;
      state.toastMessage = "";
      state.toastStatus = "default";
    },
    showModal(state, action) {
      state.showModal = true;
      state.modalContent = action.payload.content;
    },
    hideModal(state) {
      state.showModal = false;
      state.modalContent = null;
    },
    openChatBot(state, action) {
      state.chatBotOpen = action.payload;
    }
  },
});

export const { showToast, hideToast, showModal, hideModal, openChatBot } =
  popUpSlice.actions;
export default popUpSlice.reducer;
