// src/states/videoCallSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosConfig';
import { showModal, showToast } from './popUpSlice';
import { socket } from '../services/sockets';

export const setIncomingCall = createAsyncThunk(
  'videoCall/setIncomingCall',
  async (callData, { dispatch }) => {
    dispatch(showModal({ content: 'incomingCall' }));
    return callData;
  }
);

export const initiateCall = createAsyncThunk(
  'videoCall/initiate',
  async ({ userId, specialistCategory }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/api/calls/initiate', {
        userId,
        specialistCategory
      });
      
      socket.emit('callInitiated', { 
        callId: data.callId,
        channelName: data.channelName,
        callerId: userId,
        receiverId: data.specialistId
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const acceptCall = createAsyncThunk(
  'videoCall/accept',
  async (callId, { dispatch }) => {
    try {
      const { data } = await axiosInstance.patch(`/api/calls/status/${callId}`, {
        status: 'accepted'
      });
      socket.emit('callAccepted', { callId });
      dispatch(showToast({ message: 'Call accepted', status: 'success' }));
      return data;
    } catch (error) {
      dispatch(showToast({ message: 'Failed to accept call', status: 'error' }));
      throw error;
    }
  }
);

export const rejectCall = createAsyncThunk(
  'videoCall/reject',
  async (callId, { dispatch }) => {
    try {
      const { data } = await axiosInstance.patch(`/api/calls/status/${callId}`, {
        status: 'rejected'
      });
      socket.emit('callRejected', { callId });
      dispatch(showToast({ message: 'Call rejected', status: 'success' }));
      return data;
    } catch (error) {
      dispatch(showToast({ message: 'Failed to reject call', status: 'error' }));
      throw error;
    }
  }
);

export const endCall = createAsyncThunk(
  'videoCall/end',
  async (callId, { dispatch }) => {
    try {
      const { data } = await axiosInstance.patch(`/api/calls/status/${callId}`, {
        status: 'completed'
      });
      socket.emit('callEnded', { callId });
      dispatch(showToast({ message: 'Call ended', status: 'success' }));
      return data;
    } catch (error) {
      dispatch(showToast({ message: 'Failed to end call', status: 'error' }));
      throw error;
    }
  }
);

export const callAccepted = createAsyncThunk(
  'videoCall/callAccepted',
  async (callData) => {
    const { data } = await axiosInstance.patch(`/api/calls/status/${callData.callId}`, {
      status: 'accepted'
    });
    return data;
  }
);

export const callRejected = createAsyncThunk(
  'videoCall/callRejected',
  async (callData) => {
    const { data } = await axiosInstance.patch(`/api/calls/status/${callData.callId}`, {
      status: 'rejected'
    });
    return data;
  }
);

export const callEnded = createAsyncThunk(
  'videoCall/callEnded',
  async (callData) => {
    const { data } = await axiosInstance.patch(`/api/calls/status/${callData.callId}`, {
      status: 'completed'
    });
    return data;
  }
);

const videoCallSlice = createSlice({
  name: 'videoCall',
  initialState: {
    currentCall: null,
    incomingCall: null,
    isInCall: false,
    error: null,
  },
  reducers: {
    updateCallStatus: (state, action) => {
      state.isInCall = action.payload.isInCall;
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

export const { updateCallStatus } = videoCallSlice.actions;

export default videoCallSlice.reducer;