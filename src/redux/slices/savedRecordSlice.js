import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import ApiMiddleware from '../../utils/ApiMiddleware'
import { NO_CREDIT_POINTS_MESSAGE } from '../../utils/constant'

const initialState = {
  isLoading: false,
  isRegenerate: false,
  saveResultsData: [],
  totalResults: 1,
}

export const saveResultsDataFetchAPi = createAsyncThunk(
  'saveResultsFetch/fetch',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiMiddleware.get(
        `/api/search/heading/?search=${data?.search || ''}&page=${
          data?.page || '1'
        }`,
        { ...data }
      )
      return response
    } catch (error) {
      if (error.response.data.message !== NO_CREDIT_POINTS_MESSAGE) {
        toast.error(error.response.data.message)
      }
      if (!error.response) {
        throw rejectWithValue(error?.message || 'Something went wrong')
      }
      throw rejectWithValue(error.response.data.message)
    }
  }
)

const savedRecordSlice = createSlice({
  name: 'saveRecordSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [saveResultsDataFetchAPi.pending]: (state, action) => {
      state.isLoading = true
    },
    [saveResultsDataFetchAPi.fulfilled]: (state, action) => {
      state.isLoading = false
      state.saveResultsData = action?.payload?.data?.results
      state.totalResults = action?.payload?.data?.count
    },
    [saveResultsDataFetchAPi.rejected]: (state, action) => {
      state.isLoading = false
    },
  },
})

export default savedRecordSlice.reducer
