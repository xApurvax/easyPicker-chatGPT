import { createSlice } from '@reduxjs/toolkit'

const initialState: { count: number } = {
  count: 1,
}

const CounterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setDecrement: (state, action) => {
      state.count--
    },
    setIncrement: (state, action) => {
      state.count += action.payload
    },
  },
  extraReducers: {},
})

export const { setDecrement, setIncrement } = CounterSlice.actions
export default CounterSlice.reducer
