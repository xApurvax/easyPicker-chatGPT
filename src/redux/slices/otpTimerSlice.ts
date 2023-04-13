import { createSlice } from '@reduxjs/toolkit'

interface InitialStateProps {
  minute: number
  second: number
}

const initialState: InitialStateProps = {
  minute: 1,
  second: 30,
}

const OtpTimerSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setMinute: (state, action) => {
      state.minute = action.payload
    },
    setSecond: (state, action) => {
      state.second = action.payload
    },
  },
  extraReducers: {},
})

export const { setMinute, setSecond } = OtpTimerSlice.actions
export default OtpTimerSlice.reducer
