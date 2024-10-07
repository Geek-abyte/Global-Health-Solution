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
  async (
    { userId, specialistId, specialistCategory, duration },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post("/calls/initiate", {
        userId,
        specialistId,
        specialistCategory,
        duration,
      });

      socket.emit("callInitiated", {
        callId: data.callId,
        roomName: data.roomName,
        callerId: userId,
        receiverId: data.specialistId,
        duration: data.duration,
      });

      return { data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const acceptCall = createAsyncThunk(
  "videoCall/accept",
  async ({ callId }, { dispatch, getState }) => {
    try {
      const { data } = await axiosInstance.patch(`/calls/status/${callId}`, {
        status: "accepted",
      });

      const callData = data;

      socket.emit("callAccepted", {
        callId,
        callerId: callData.userId,
        receiverId: callData.specialistId,
        channelName: data.channelName,
        token: data.token,
      });

      dispatch(showToast({ message: "Call accepted", status: "success" }));

      return { ...data, callId, status: "accepted" };
    } catch (error) {
      console.error("Error accepting call:", error);
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
      const { data } = await axiosInstance.patch(`/calls/status/${callId}`, {
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
      const { data } = await axiosInstance.patch(`/calls/status/${callId}`, {
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
      `/calls/status/${callData.callId}`,
      {
        status: "accepted",
      }
    );
    return { ...data, callId: callData.callId };
  }
);
export const callRejected = createAsyncThunk(
  "videoCall/callRejected",
  async (callData) => {
    const { data } = await axiosInstance.patch(
      `/calls/status/${callData.callId}`,
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
      `/calls/status/${callData.callId}`,
      {
        status: "completed",
      }
    );
    return data;
  }
);

export const initializeAgoraEngine = createAsyncThunk(
  "videoCall/initializeAgoraEngine",
  async (channelName, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/calls/agora-token/${channelName}`
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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
    agoraAppId: null,
    agoraToken: null,
    agoraChannelName: null,
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
    setAgoraCredentials: (state, action) => {
      state.agoraAppId = action.payload.appId;
      state.agoraToken = action.payload.token;
      state.agoraChannelName = action.payload.channelName;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setIncomingCall.fulfilled, (state, action) => {
        state.incomingCall = action.payload;
      })
      .addCase(initiateCall.fulfilled, (state, action) => {
        state.currentCall = action.payload;
        state.isInCall = true;
      })
      .addCase(acceptCall.fulfilled, (state, action) => {
        state.currentCall = action.payload;
        state.incomingCall = null;
      })
      .addCase(acceptCall.rejected, (state, action) => {
        state.error = action.error.message;
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
        state.currentCall = { ...state.currentCall, ...action.payload };
        state.isInCall = true;
      })
      .addCase(callRejected.fulfilled, (state, action) => {
        state.currentCall = action.payload;
        state.isInCall = false;
      })
      .addCase(callEnded.fulfilled, (state, action) => {
        state.currentCall = action.payload;
        state.isInCall = false;
      })
      .addCase(initializeAgoraEngine.fulfilled, (state, action) => {
        state.agoraAppId = action.payload.appId;
        state.agoraToken = action.payload.token;
        state.agoraChannelName = action.payload.channelName;
      });
  },
});

export const {
  updateCallStatus,
  updateSpecialistCategory,
  setCameraEnabled,
  setMicEnabled,
  setAgoraCredentials,
} = videoCallSlice.actions;

export default videoCallSlice.reducer;
