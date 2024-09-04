import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showModal, showToast } from "./popUpSlice";
import { socket } from "../services/sockets";
import axiosInstance from "../utils/axiosConfig";

export const setIncomingCall = createAsyncThunk(
  "videoCall/setIncomingCall",
  async (callData, { dispatch }) => {
    dispatch(showModal({ content: "incomingCall" }));
    return callData;
  }
);

export const initiateCall = createAsyncThunk(
  "videoCall/initiate",
  async ({ userId, specialistCategory }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("/calls/initiate", {
        userId,
        specialistCategory,
      });

      socket.emit("callInitiated", {
        callId: data.callId,
        channelName: data.channelName,
        callerId: userId,
        receiverId: data.specialistId,
        token: data.token,
      });

      return { data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const acceptCall = createAsyncThunk(
  "videoCall/accept",
  async ({ callId, token }, { dispatch }) => {
    if (!callId) {
      throw new Error("callId is undefined");
    }
    try {
      const { data } = await axiosInstance.patch(`calls/status/${callId}`, {
        status: "accepted",
      });
      socket.emit("callAccepted", {
        callId,
        callerId: data.userId,
        channelName: data.channelName,
        receiverId: data.specialistId,
        token,
        status: "accepted",
      });
      dispatch(showToast({ message: "Call accepted", status: "success" }));

      return { ...data, token };
    } catch (error) {
      dispatch(
        showToast({ message: "Failed to accept call", status: "error" })
      );
      throw error;
    }
  }
);
export const rejectCall = createAsyncThunk(
  "videoCall/reject",
  async (callId, { dispatch }) => {
    try {
      const { data } = await axiosInstance.patch(`calls/status/${callId}`, {
        status: "rejected",
      });
      socket.emit("callRejected", { callId });
      dispatch(showToast({ message: "Call rejected", status: "success" }));
      return data;
    } catch (error) {
      dispatch(
        showToast({ message: "Failed to reject call", status: "error" })
      );
      throw error;
    }
  }
);

export const endCall = createAsyncThunk(
  "videoCall/end",
  async (callId, { dispatch }) => {
    try {
      const { data } = await axiosInstance.patch(`calls/status/${callId}`, {
        status: "completed",
      });
      socket.emit("callEnded", { callId });
      dispatch(showToast({ message: "Call ended", status: "success" }));
      return data;
    } catch (error) {
      dispatch(showToast({ message: "Failed to end call", status: "error" }));
      throw error;
    }
  }
);

export const callAccepted = createAsyncThunk(
  "videoCall/callAccepted",
  async (callData) => {
    const { data } = await axiosInstance.patch(
      `calls/status/${callData.callId}`,
      {
        status: "accepted",
      }
    );
    return callData;
  }
);
export const callRejected = createAsyncThunk(
  "videoCall/callRejected",
  async (callData) => {
    const { data } = await axiosInstance.patch(
      `calls/status/${callData.callId}`,
      {
        status: "rejected",
      }
    );
    return data;
  }
);

export const callEnded = createAsyncThunk(
  "videoCall/callEnded",
  async (callData) => {
    const { data } = await axiosInstance.patch(
      `calls/status/${callData.callId}`,
      {
        status: "completed",
      }
    );
    return data;
  }
);

const videoCallSlice = createSlice({
  name: "videoCall",
  initialState: {
    isCameraEnabled: false,
    isMicEnabled: false,
    currentCall: null,
    incomingCall: null,
    isInCall: false,
    error: null,
    currentSpecialistCategory: "",
  },
  reducers: {
    updateCallStatus: (state, action) => {
      state.isInCall = action.payload.isInCall;
    },
    updateSpecialistCategory: (state, action) => {
      state.currentSpecialistCategory = action.payload;
    },
    setCameraEnabled: (state, action) => {
      state.isCameraEnabled = action.payload.camera;
    },
    setMicEnabled: (state, action) => {
      state.isMicEnabled = action.payload.mic;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setIncomingCall.fulfilled, (state, action) => {
        state.incomingCall = action.payload;
      })
      .addCase(initiateCall.fulfilled, (state, action) => {
        state.currentCall = action.payload;
        console.log("at init", action.payload);
        state.isInCall = true;
      })
      .addCase(acceptCall.fulfilled, (state, action) => {
        state.currentCall = action.payload;
        console.log("at accept", action.payload);
        state.incomingCall = null;
        state.isInCall = true;
      })
      .addCase(rejectCall.fulfilled, (state, action) => {
        state.incomingCall = null;
        state.currentCall = action.payload;
        state.isInCall = false;
      })
      .addCase(endCall.fulfilled, (state, action) => {
        state.currentCall = action.payload;
        state.isInCall = false;
      })
      .addCase(callAccepted.fulfilled, (state, action) => {
        state.currentCall = action.payload;
        console.log("at accepted", action.payload);

        state.isInCall = true;
      })
      .addCase(callRejected.fulfilled, (state, action) => {
        state.currentCall = action.payload;
        state.isInCall = false;
      })
      .addCase(callEnded.fulfilled, (state, action) => {
        state.currentCall = action.payload;
        state.isInCall = false;
      });
  },
});

export const {
  updateCallStatus,
  updateSpecialistCategory,
  setCameraEnabled,
  setMicEnabled,
} = videoCallSlice.actions;

export default videoCallSlice.reducer;
