import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  headlineLength: [50, 100],
  headlineType: 20,
}

const RangeSliderSlice = createSlice({
  name: 'RangeSlider',
  initialState,
  reducers: {
    setHeadlineLength: (state, action) => {
      state.headlineLength = action.payload
    },
    setHeadlineType: (state, action) => {
      state.headlineType = action.payload
    },
  },
  extraReducers: {},
})

export const { setHeadlineLength, setHeadlineType } = RangeSliderSlice.actions
export default RangeSliderSlice.reducer
