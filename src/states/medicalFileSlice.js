import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosConfig";

const initialState = {
  medicalFile: null,
  loading: false,
  error: null,
};

export const fetchMedicalFile = createAsyncThunk(
  "medicalFile/fetchMedicalFile",
  async (patientId) => {
    const response = await axiosInstance.get(`/medical-file/${patientId}`);
    return response.data;
  }
);

export const updateMedicalFile = createAsyncThunk(
  "medicalFile/updateMedicalFile",
  async ({ patientId, content, prescription }) => {
    const response = await axiosInstance.put(`/medical-file/${patientId}`, {
      content,
      prescription,
    });
    return response.data;
  }
);

export const fetchPrescriptions = createAsyncThunk(
  "medicalFile/fetchPrescriptions",
  async (patientId) => {
    const response = await axiosInstance.get(
      `/medical-file/${patientId}/prescriptions`
    );
    return response.data;
  }
);

const medicalFileSlice = createSlice({
  name: "medicalFile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicalFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMedicalFile.fulfilled, (state, action) => {
        state.loading = false;
        state.medicalFile = action.payload;
      })
      .addCase(fetchMedicalFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateMedicalFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMedicalFile.fulfilled, (state, action) => {
        state.loading = false;
        state.medicalFile = action.payload;
      })
      .addCase(updateMedicalFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPrescriptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPrescriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.medicalFile = {
          ...state.medicalFile,
          prescriptions: action.payload.prescriptions,
        };
      })
      .addCase(fetchPrescriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default medicalFileSlice.reducer;
