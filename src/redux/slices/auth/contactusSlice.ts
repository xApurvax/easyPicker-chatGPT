import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import ApiMiddleware from '../../../utils/ApiMiddleware'
import toast from 'react-hot-toast'
import { ContactUsPayload } from '../../../utils/types/types'

interface ContactUsState {
  isLoading: boolean
  isSubmittedSuccessfully: boolean
}

const initialState: ContactUsState = {
  isLoading: false,
  isSubmittedSuccessfully : false
}

export const ContactUsFetchAPi = createAsyncThunk(
  'contactUs/fetch',
  async (data: ContactUsPayload, { rejectWithValue }) => {
    try {
      const response = await ApiMiddleware.post('/api/contactus/', data)
      toast.success(response.data.message)
      return response.data
    } catch (error: any) {
      if (!error.response) {
        toast.error(error?.message)
        throw rejectWithValue(error?.message || 'Something went wrong')
      }
      throw rejectWithValue(error.response.data.message)
    }
  }
)

const ContactusSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ContactUsFetchAPi.pending, (state) => {
      state.isLoading = true
      state.isSubmittedSuccessfully = false
    })
    builder.addCase(ContactUsFetchAPi.fulfilled, (state, { payload }) => {
      state.isLoading = false
      state.isSubmittedSuccessfully = true
      if (payload?.data?.status_code === 200) {
        // state.allData = payload?.data?.result[0];
        // state.coins = payload?.data?.result[0]?.avaliable_credit;
        // Cookies.set("access_token", payload?.data?.result[0]?.token?.access);
        // Cookies.set("refresh_token", payload?.data?.result[0]?.token?.refresh);
        // Cookies.set("coins", payload?.data?.result[0]?.avaliable_credit);
      }
    })
    builder.addCase(
      ContactUsFetchAPi.rejected,
      (state, { payload }: PayloadAction<unknown>) => {
        state.isLoading = false
        state.isSubmittedSuccessfully = false
        toast.error(payload as string)
      }
    )
  },
})

export default ContactusSlice.reducer
