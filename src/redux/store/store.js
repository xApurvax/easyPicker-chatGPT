import { configureStore } from "@reduxjs/toolkit";
import buttonEffectSlice from "../slices/buttonEffectSlice";
import RangeSliderSlice from "../slices/RangeSliderSlice";
import generateHeadlineSlice from "../slices/generateHeadlineSlice";
import counterSlice from "../slices/counterSlice";

const store = configureStore({
  reducer: { buttonEffectSlice,
             RangeSliderSlice,
             generateHeadlineSlice,
             counterSlice },
  middleware: (getDefaultMiddlerWare) =>
    getDefaultMiddlerWare({
      serializableCheck: false,
    }),
  devTools: true,
});

export default store;
