import { createSlice, createAction } from "@reduxjs/toolkit";

// Add these new actions
export const triggerChatbotAttention = createAction(
  "popUp/triggerChatbotAttention"
);

export const resetChatbotAttention = createAction(
  "popUp/resetChatbotAttention"
);

const initialState = {
  showToast: false,
  toastMessage: "",
  toastStatus: "default",
  showModal: false,
  modalContent: null,
  chatBotOpen: false,
  chatbotAttentionTriggered: false, // Add this new state
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(triggerChatbotAttention, (state) => {
      state.chatbotAttentionTriggered = true;
    });
    builder.addCase(resetChatbotAttention, (state) => {
      state.chatbotAttentionTriggered = false;
    });
  },
});

export const { showToast, hideToast, showModal, hideModal, openChatBot } =
  popUpSlice.actions;

export default popUpSlice.reducer;
