import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";

// Async thunks
export const fetchBlogs = createAsyncThunk(
  "blog/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/blogs");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch blogs");
    }
  }
);

export const fetchBlog = createAsyncThunk(
  "blog/fetchBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch blog");
    }
  }
);

export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/blogs", blogData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create blog");
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async ({ id, ...blogData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/blogs/${id}`, blogData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update blog");
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/blogs/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete blog");
    }
  }
);

const initialState = {
  blogs: [],
  currentBlog: null,
  loading: false,
  error: null,
  success: false,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(action.payload);
        state.success = true;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.blogs.findIndex(
          (blog) => blog._id === action.payload._id
        );
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
        state.currentBlog = action.payload;
        state.success = true;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess } = blogSlice.actions;
export default blogSlice.reducer;
