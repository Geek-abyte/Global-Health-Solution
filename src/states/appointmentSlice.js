import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosConfig";

export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAppointments",
  async () => {
    const response = await axiosInstance.get("/appointments");
    return response.data;
  }
);

export const createAppointment = createAsyncThunk(
  "appointments/createAppointment",
  async (appointmentData) => {
    const response = await axiosInstance.post("/appointments", appointmentData);
    return response.data;
  }
);

export const updateAppointmentStatus = createAsyncThunk(
  "appointments/updateAppointmentStatus",
  async ({ appointmentId, status }) => {
    const response = await axiosInstance.put(`/appointments/${appointmentId}`, {
      status,
    });
    return response.data;
  }
);

export const fetchSpecialistAppointments = createAsyncThunk(
  "appointments/fetchSpecialistAppointments",
  async () => {
    const response = await axiosInstance.get("/appointments/specialist");
    return response.data;
  }
);

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (appointment) => appointment._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(fetchSpecialistAppointments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSpecialistAppointments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchSpecialistAppointments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default appointmentSlice.reducer;
