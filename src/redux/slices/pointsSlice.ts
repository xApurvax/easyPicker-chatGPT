import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import ApiMiddleware from '../../utils/ApiMiddleware'
import { SOMETHING_WENT_WRONG } from '../../utils/constant'

export type AllTransactionHistory = {
  purchased_at: string
  points: number
  amount: number
}
interface PointsState {
  isLoading: boolean
  isLoadingTransactionHistory: boolean
  showBuyPointsModal: boolean
  allTransactionHistory: AllTransactionHistory[]
  totalResults: number
}

interface BuyPointsData {
  points: number
}

interface TransactionHistoryData {
  date?: string
  page: number
  order: string
}

export const BuyPointsFetchAPi = createAsyncThunk(
  'BuyPoints/fetch',
  async (data: BuyPointsData, { rejectWithValue }) => {
    try {
      const response = await ApiMiddleware.post('/api/upgrade/points/', {
        ...data,
      })
      return response
    } catch (error: any) {
      if (!error.response) {
        throw rejectWithValue(error?.message || SOMETHING_WENT_WRONG)
      }
      throw rejectWithValue(error.response.data.message)
    }
  }
)

export const transactionHistoryFetchAPi = createAsyncThunk(
  'transactionHistory/fetch',
  async (data: TransactionHistoryData, { rejectWithValue }) => {
    try {
      const response = await ApiMiddleware.get(
        `/api/upgrade/points/?date=${data?.date || ''}&page=${
          data?.page || ''
        }&dsc=${data?.order || ''}&page_size=5`
      )
      return response
    } catch (error: any) {
      if (!error.response) {
        throw rejectWithValue(error?.message || SOMETHING_WENT_WRONG)
      }
      throw rejectWithValue(error.response.data.message)
    }
  }
)

const initialState: PointsState = {
  isLoading: false,
  isLoadingTransactionHistory: false,
  showBuyPointsModal: false,
  allTransactionHistory: [],
  totalResults: 0,
}

const PointsSlice = createSlice({
  name: 'pointsSlice',
  initialState,
  reducers: {
    setShowBuyPointsModal: (state, action: PayloadAction<boolean>) => {
      state.showBuyPointsModal = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(BuyPointsFetchAPi.pending, (state) => {
        state.isLoading = true
      })
      .addCase(BuyPointsFetchAPi.fulfilled, (state, action) => {
        state.isLoading = false
        state.showBuyPointsModal = false
        toast.success(action?.payload?.data?.message)
      })
      .addCase(BuyPointsFetchAPi.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(transactionHistoryFetchAPi.pending, (state) => {
        state.isLoadingTransactionHistory = true
      })
      .addCase(transactionHistoryFetchAPi.fulfilled, (state, action) => {
        state.isLoadingTransactionHistory = false
        state.allTransactionHistory = action?.payload?.data?.results
        state.totalResults = action?.payload?.data?.count
      })
      .addCase(transactionHistoryFetchAPi.rejected, (state) => {
        state.isLoadingTransactionHistory = false
      })
  },
})

export const { setShowBuyPointsModal } = PointsSlice.actions
export default PointsSlice.reducer
