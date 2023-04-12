import { configureStore } from '@reduxjs/toolkit'
import buttonEffectSlice from '../slices/buttonEffectSlice'
import RangeSliderSlice from '../slices/RangeSliderSlice'
import generateHeadlineSlice from '../slices/generateHeadlineSlice'
import pointsSlice from '../slices/pointsSlice'
import ProfileSlice from '../slices/ProfileSlice'
import otpTimerSlice from '../slices/otpTimerSlice'
import savedRecordSlice from '../slices/savedRecordSlice'
import counterSlice from '../slices/counterSlice'
import contactusSlice from '../slices/auth/contactusSlice'
import loginSlice from '../slices/auth/loginSlice'
import registerSlice from '../slices/auth/registerSlice'
import forgotPasswordSlice from '../slices/auth/forgotPasswordSlice'

const store = configureStore({
  reducer: {
    buttonEffectSlice,
    RangeSliderSlice,
    generateHeadlineSlice,
    counterSlice,
    loginSlice,
    registerSlice,
    forgotPasswordSlice,
    savedRecordSlice,
    pointsSlice,
    ProfileSlice,
    contactusSlice,
    otpTimerSlice,
  },
  middleware: (getDefaultMiddlerWare) =>
    getDefaultMiddlerWare({
      serializableCheck: false,
    }),
  devTools: true,
})

export default store
