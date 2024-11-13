import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";
import {
  getToken,
  removeProperty,
  setTokenWithExpiry,
} from "../../utils/helperFunctions";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        timeout: 10000, // 10 second timeout
        retry: 3,
        retryDelay: (retryCount) => retryCount * 1000,
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${apiUrl}/api/users/login`,
        userData,
        config
      );

      return response.data;
    } catch (error) {
      if (error.code === "ECONNRESET") {
        return rejectWithValue("Connection was reset. Please try again.");
      }
      return rejectWithValue(
        error.response?.data?.message || "An error occurred during login"
      );
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/users/profile");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put("/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: getToken() || null,
    isAuthenticated: !!getToken(),
    userRole: localStorage.getItem("userRole") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      state.userRole = null;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.userRole = action.payload.role;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
