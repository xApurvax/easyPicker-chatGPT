import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'
import ApiMiddleware from '../../utils/ApiMiddleware'
import Cookies from 'js-cookie'
import { NO_CREDIT_POINTS_MESSAGE } from '../../utils/constant'

interface ProfileDetailsState {
  isLoading: boolean
  isUpdating: boolean
  message: string
  profileDetails: any
}

const initialState: ProfileDetailsState = {
  isLoading: false,
  isUpdating: false,
  message: '',
  profileDetails: [],
}

export const profileDetailsFetchAPI = createAsyncThunk(
  'profileDetailsFetch/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiMiddleware.get(`/api/auth/profile/`)
      return response
    } catch (error: any) {
      if (error.response?.data.message !== NO_CREDIT_POINTS_MESSAGE)
        toast.error(error.response?.data.message)
      if (!error.response)
        throw rejectWithValue(error?.message || 'Something went wrong')

      throw rejectWithValue(error.response?.data.message)
    }
  }
)

export const profileDetailsUpdateFetchAPI = createAsyncThunk(
  'profileDetailsUpdateFetch/fetch',
  async (data: FormData, { rejectWithValue }): Promise<any> => {
    try {
      const response = await ApiMiddleware.put(`/api/auth/register/`, data)
      return response
    } catch (error: any) {
      if (error.response?.data.message !== NO_CREDIT_POINTS_MESSAGE) {
        toast.error(error.response?.data.message)
      }
      if (!error.response) throw rejectWithValue(error)
      throw rejectWithValue(error.response?.data.message)
    }
  }
)

const ProfileSlice = createSlice({
  name: 'profileDetailsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(profileDetailsFetchAPI.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(
      profileDetailsFetchAPI.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.profileDetails = action.payload?.data?.result[0]?.user[0]
        Cookies.set(
          'userDetails',
          JSON.stringify(action.payload?.data?.result[0]?.user[0])
        )
      }
    )
    builder.addCase(profileDetailsFetchAPI.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(profileDetailsUpdateFetchAPI.pending, (state) => {
      state.isUpdating = true
    })
    builder.addCase(
      profileDetailsUpdateFetchAPI.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isUpdating = false
        toast.success(action.payload?.data?.message)
        state.profileDetails = action.payload?.data?.result[0]?.profile
      }
    )
    builder.addCase(profileDetailsUpdateFetchAPI.rejected, (state) => {
      state.isUpdating = false
    })
  },
})

export default ProfileSlice.reducer
