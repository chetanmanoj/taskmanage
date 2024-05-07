import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  },
  reducers: {
    setUserLoginStatus(state, action) {
      state.isLoggedIn = action.payload;
      localStorage.setItem("isLoggedIn", action.payload ? "true" : "false");
    },
  },
});

export const { setUserLoginStatus } = userSlice.actions;
export default userSlice.reducer;
