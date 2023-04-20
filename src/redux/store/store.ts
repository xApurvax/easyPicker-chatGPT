import { configureStore } from '@reduxjs/toolkit'
import ButtonEffectSlice from '../slices/buttonEffectSlice'
import RangeSliderSlice from '../slices/RangeSliderSlice'
import GenerateHeadlineSlice from '../slices/generateHeadlineSlice'
import PointsSlice from '../slices/pointsSlice'
import ProfileSlice from '../slices/ProfileSlice'
import LoginSlice from '../slices/auth/loginSlice'
import OtpTimerSlice from '../slices/otpTimerSlice'
import SavedRecordSlice from '../slices/savedRecordSlice'
import CounterSlice from '../slices/counterSlice'
import ContactusSlice from '../slices/auth/contactusSlice'
import RegisterSlice from '../slices/auth/registerSlice'
import ForgotPasswordSlice from '../slices/auth/forgotPasswordSlice'
import logger from 'redux-logger'

const rootReducer = {
  ButtonEffectSlice,
  RangeSliderSlice,
  GenerateHeadlineSlice,
  CounterSlice,
  LoginSlice,
  RegisterSlice,
  ForgotPasswordSlice,
  SavedRecordSlice,
  PointsSlice,
  ProfileSlice,
  ContactusSlice,
  OtpTimerSlice,
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddlerWare) =>
    getDefaultMiddlerWare({
      serializableCheck: false,
    }).concat(logger),
  devTools: true,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
