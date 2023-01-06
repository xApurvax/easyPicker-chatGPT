import { configureStore } from "@reduxjs/toolkit";
import buttonEffectSlice from "../slices/buttonEffectSlice";
import RangeSliderSlice from "../slices/RangeSliderSlice";
import generateHeadlineSlice from "../slices/generateHeadlineSlice";
import counterSlice from "../slices/counterSlice";
import loginSlice from "../../redux/slices/auth/loginSlice";
import registerSlice from "../../redux/slices/auth/registerSlice";

const store = configureStore({
  reducer: { buttonEffectSlice,
             RangeSliderSlice,
             generateHeadlineSlice,
             counterSlice,
             loginSlice ,
             registerSlice},
  middleware: (getDefaultMiddlerWare) =>
    getDefaultMiddlerWare({
      serializableCheck: false,
    }),
  devTools: true,
});

export default store;
