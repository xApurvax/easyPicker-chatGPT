import { configureStore } from "@reduxjs/toolkit";
import buttonEffectSlice from "../slices/buttonEffectSlice";
import RangeSliderSlice from "../slices/RangeSliderSlice";
import generateHeadlineSlice from "../slices/generateHeadlineSlice";
import pointsSlice from "../slices/pointsSlice";
import ProfileSlice from "../slices/ProfileSlice";
import savedRecordSlice from "../slices/savedRecordSlice";
import counterSlice from "../slices/counterSlice";
import loginSlice from "../../redux/slices/auth/loginSlice";
import registerSlice from "../../redux/slices/auth/registerSlice";
import forgotPasswordSlice from "../../redux/slices/auth/forgotPasswordSlice";

const store = configureStore({
  reducer: { buttonEffectSlice,
             RangeSliderSlice,
             generateHeadlineSlice,
             counterSlice,
             loginSlice ,
             registerSlice,
             forgotPasswordSlice,
             savedRecordSlice,
             pointsSlice,
             ProfileSlice,
             },
  middleware: (getDefaultMiddlerWare) =>
    getDefaultMiddlerWare({
      serializableCheck: false,
    }),
  devTools: true,
});

export default store;
