import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navMode: "full",
};

const navBarSlice = createSlice({
  name: "navBar",
  initialState,
  reducers: {
    setNavMode(state, action) {
      state.navMode = action.payload;
    },
  },
});

export const { setNavMode } = navBarSlice.actions;
export default navBarSlice.reducer;
