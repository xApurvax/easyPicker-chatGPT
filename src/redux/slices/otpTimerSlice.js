import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  minute : 1,
  second : 30,
};

const otpTimerSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setMinute: (state, action) => {
      state.minute = action.payload;
    },
    setSecond: (state, action) => {
      state.second = action.payload;
    },
  },
  extraReducers: {},
});

export const { setMinute,setSecond } = otpTimerSlice.actions;
export default otpTimerSlice.reducer;