import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import ApiMiddleware from '../../utils/ApiMiddleware'
import {
  NO_CREDIT_POINTS_MESSAGE,
  SOMETHING_WENT_WRONG,
} from '../../utils/constant'

interface SaveRecordState {
  isLoading: boolean
  isRegenerate: boolean
  saveResultsData: any[]
  totalResults: number
}

interface SaveRecordData {
  search?: string
  page?: string
}

export const saveResultsDataFetchAPi = createAsyncThunk(
  'saveResultsFetch/fetch',
  async (data: SaveRecordData, { rejectWithValue }) => {
    try {
      const response = await ApiMiddleware.get(
        `/api/search/heading/?search=${data?.search || ''}&page=${
          data?.page || '1'
        }`,
        { ...data }
      )
      return response
    } catch (error: any) {
      if (
        error.response &&
        error.response.data.message !== NO_CREDIT_POINTS_MESSAGE
      )
        toast.error(error.response.data.message)

      if (!error.response)
        throw rejectWithValue(error?.message || SOMETHING_WENT_WRONG)

      throw rejectWithValue(error.response.data.message)
    }
  }
)

const initialState: SaveRecordState = {
  isLoading: false,
  isRegenerate: false,
  saveResultsData: [],
  totalResults: 1,
}

const SavedRecordSlice = createSlice({
  name: 'saveRecordSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveResultsDataFetchAPi.pending, (state, _) => {
        state.isLoading = true
      })
      .addCase(
        saveResultsDataFetchAPi.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false
          state.saveResultsData = action.payload.data.results
          state.totalResults = action.payload.data.count
        }
      )
      .addCase(saveResultsDataFetchAPi.rejected, (state, _) => {
        state.isLoading = false
      })
  },
})

export default SavedRecordSlice.reducer
