import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count:1
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
  },
  extraReducers: {},
});

export const { setDecrement,setIncrement } = counterSlice.actions;
export default counterSlice.reducer;