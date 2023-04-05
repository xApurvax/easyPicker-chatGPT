import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ApiMiddleware from '../../../utils/ApiMiddleware'
import toast from 'react-hot-toast'

const initialState = {
  isLoading: false,
}

export const ContactUsFetchAPi = createAsyncThunk(
  'contactUs/fetch',
  async (data, { rejectWithValue }) => {
    try {
      const response = await ApiMiddleware.post('/api/contactus/', { ...data })
      toast.success(response.data.message)
      return response
    } catch (error) {
      if (!error.response) {
        toast.error(error?.message)
        throw rejectWithValue(error?.message || 'Something went wrong')
      }
      throw rejectWithValue(error.response.data.message)
    }
  }
)

const contactusSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: {
    [ContactUsFetchAPi.pending]: (state, action) => {
      state.isLoading = true
    },
    [ContactUsFetchAPi.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      if (payload?.data?.status_code === 200) {
        //   state.allData = payload?.data?.result[0];
        //   state.coins = payload?.data?.result[0]?.avaliable_credit;
        //   Cookies.set("access_token", payload?.data?.result[0]?.token?.access);
        //   Cookies.set("refresh_token", payload?.data?.result[0]?.token?.refresh);
        //   Cookies.set("coins", payload?.data?.result[0]?.avaliable_credit);
      }
    },
    [ContactUsFetchAPi.rejected]: (state, action) => {
      state.isLoading = false
      toast.error(action?.payload)
    },
  },
})

export default contactusSlice.reducer
