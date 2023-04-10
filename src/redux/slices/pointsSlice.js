import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import ApiMiddleware from '../../utils/ApiMiddleware'

const initialState = {
  isLoading: false,
  isLoadingTransactionHistory: false,
  showBuyPointsModal: false,
  allTransactionHistory: [],
  totalResults: 0,
}

export const BuyPointsFetchAPi = createAsyncThunk(
  'BuyPoints/fetch',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiMiddleware.post('/api/upgrade/points/', {
        ...data,
      })
      return response
    } catch (error) {
      if (!error.response) {
        throw rejectWithValue(error?.message || 'Something went wrong')
      }
      throw rejectWithValue(error.response.data.message)
    }
  }
)

export const transactionHistoryFetchAPi = createAsyncThunk(
  'transactionHistory/fetch',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiMiddleware.get(
        `/api/upgrade/points/?date=${data?.date || ''}&page=${
          data?.page || ''
        }&dsc=${data?.order || ''}&page_size=5`,
        { ...data }
      )
      return response
    } catch (error) {
      if (!error.response) {
        throw rejectWithValue(error?.message || 'Something went wrong')
      }
      throw rejectWithValue(error.response.data.message)
    }
  }
)

const pointsSlice = createSlice({
  name: 'pointsSlice',
  initialState,
  reducers: {
    setShowBuyPointsModal: (state, action) => {
      state.showBuyPointsModal = action.payload
    },
  },
  extraReducers: {
    [BuyPointsFetchAPi.pending]: (state, action) => {
      state.isLoading = true
    },
    [BuyPointsFetchAPi.fulfilled]: (state, action) => {
      state.isLoading = false
      state.showBuyPointsModal = false
      toast.success(action?.payload?.data?.message)
    },
    [BuyPointsFetchAPi.rejected]: (state, action) => {
      state.isLoading = false
    },
    [transactionHistoryFetchAPi.pending]: (state, action) => {
      state.isLoadingTransactionHistory = true
    },
    [transactionHistoryFetchAPi.fulfilled]: (state, action) => {
      state.isLoadingTransactionHistory = false
      state.allTransactionHistory = action?.payload?.data?.results
      state.totalResults = action?.payload?.data?.count
    },
    [transactionHistoryFetchAPi.rejected]: (state, action) => {
      state.isLoadingTransactionHistory = false
    },
  },
})

export const { setShowBuyPointsModal } = pointsSlice.actions
export default pointsSlice.reducer
