import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count:3
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setDecrement: (state, action) => {
      state.count--;
    },
    setIncrement: (state, action) => {
      state.count += action.payload;
    },
    setReset: (state, action) => {
      state.count = 3;
    },
  },
  extraReducers: {},
});

export const { setDecrement,setIncrement,setReset } = counterSlice.actions;
export default counterSlice.reducer;