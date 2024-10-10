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
    console.log("Fetching medical file for patientId:", patientId);
    const response = await axiosInstance.get(`/medical-file/${patientId}`);
    console.log("Fetched medical file response:", response);
    return response.data;
  }
);

export const updateMedicalFile = createAsyncThunk(
  "medicalFile/updateMedicalFile",
  async ({ patientId, content }) => {
    const response = await axiosInstance.put(`/medical-file/${patientId}`, {
      content,
    });
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
        console.log("Updating state with medical file:", action.payload);
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
      });
  },
});

export default medicalFileSlice.reducer;
