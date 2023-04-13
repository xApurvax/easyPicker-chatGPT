import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RangeSliderState {
  headlineLength: [number, number];
  headlineType: number;
}

const initialState: RangeSliderState = {
  headlineLength: [50, 100],
  headlineType: 20,
}

const RangeSliderSlice = createSlice({
  name: 'RangeSlider',
  initialState,
  reducers: {
    setHeadlineLength: (state, action: PayloadAction<[number, number]>) => {
      state.headlineLength = action.payload
    },
    setHeadlineType: (state, action: PayloadAction<number>) => {
      state.headlineType = action.payload
    },
  },
  extraReducers: {},
})

export const { setHeadlineLength, setHeadlineType } = RangeSliderSlice.actions
export default RangeSliderSlice.reducer
