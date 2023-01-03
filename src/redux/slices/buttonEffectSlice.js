import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scanEffect: false,
  generateHeadlineEffect: false,
  addToFocusEffect: false,
  saveResult: false,
  reGenerate:false
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
    setSaveResult: (state, action) => {
      state.saveResult = action.payload;
    },
    setReGenerate: (state, action) => {
      state.reGenerate = action.payload;
    },
  },
  extraReducers: {},
});

export const { setScanEffect,setGenerateHeadlineEffect,setAddToFocusEffect,setSaveResult,setReGenerate } = buttonEffectSlice.actions;
export default buttonEffectSlice.reducer;
