import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scanEffect: false,
  generateHeadlineEffect: false,
  addToFocusEffect: false,
};

const buttonEffectSlice = createSlice({
  name: "buttonEffect",
  initialState,
  reducers: {
    setScanEffect: (state, action) => {
      state.scanEffect = action.payload;
    },
    setGenerateHeadlineEffect: (state, action) => {
      state.generateHeadlineEffect = action.payload;
    },
    setAddToFocusEffect: (state, action) => {
      state.addToFocusEffect = action.payload;
    },
  },
  extraReducers: {},
});

export const { setScanEffect,setGenerateHeadlineEffect,setAddToFocusEffect } = buttonEffectSlice.actions;
export default buttonEffectSlice.reducer;
