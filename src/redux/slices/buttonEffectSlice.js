import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scanEffect: false,
  generateHeadlineEffect: false,
  addToFocusEffect: false,
  saveResult: false,
  reGenerate:false,
  loginEffect:false,
  signInEffect:false,
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
    setLoginEffect: (state, action) => {
      state.loginEffect = action.payload;
    },
    setSignInEffect: (state, action) => {
      state.signInEffect = action.payload;
    },
  },
  extraReducers: {},
});

export const { setScanEffect,setGenerateHeadlineEffect,setAddToFocusEffect,setSaveResult,setReGenerate,setLoginEffect,setSignInEffect } = buttonEffectSlice.actions;
export default buttonEffectSlice.reducer;
