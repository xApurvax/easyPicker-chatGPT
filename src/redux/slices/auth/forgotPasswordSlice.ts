import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ApiMiddleware from '../../../utils/ApiMiddleware'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import {
  ForgotOtpVerifyApiPayload,
  ForgotPasswordFetchPayload,
  PasswordResetPayload,
} from '../../../utils/types/types'
import { SOMETHING_WENT_WRONG } from '../../../utils/constant'

interface UserState {
  isVerify: boolean
  isVerified: boolean
  isPasswordChange: boolean
  forgotModal: {
    email: string | null
    isVisible: boolean
    otpVerified: boolean
  }
  resetPasswordStatus: null | string
}

const initialState: UserState = {
  isVerify: false,
  isVerified: false,
  isPasswordChange: false,
  forgotModal: { email: null, isVisible: false, otpVerified: false },
  resetPasswordStatus: null,
}

export const forgotFetchAPi = createAsyncThunk(
  'forgot-password/fetch',
  async (data: ForgotPasswordFetchPayload, { rejectWithValue }) => {
    try {
      const forgotPassword = await ApiMiddleware.post(
        'api/auth/password/reset/email/',
        data
      )
      Cookies.set('user_mail', data.email)
      toast.success(forgotPassword.data.message)
      return { ...forgotPassword, ...data }
    } catch (error: any) {
      if (!error.response) {
        throw rejectWithValue(error)
      }
      throw rejectWithValue(error.response.data.message)
    }
  }
)

export const forgotOtpVerifyApi = createAsyncThunk(
  '/auth/otp-verify',
  async (values: ForgotOtpVerifyApiPayload, { rejectWithValue }: any) => {
    try {
      const response = await ApiMiddleware.post(
        '/api/auth/password/reset/otp/',
        values
      )
      return response.data
    } catch (error: any) {
      if (!error.response) {
        throw rejectWithValue(error)
      }
      throw rejectWithValue(error.response.data.message)
    }
  }
)

export const resetPasswordApi = createAsyncThunk(
  '/auth/reset-password',
  async (values: PasswordResetPayload, { rejectWithValue }) => {
    try {
      const response = await ApiMiddleware.post('/api/auth/password/reset/', {
        ...values,
      })
      return response.data
    } catch (error: any) {
      if (!error.response) {
        throw rejectWithValue(error)
      }
      throw rejectWithValue(error.response.data.message)
    }
  }
)

const ForgotPasswordSlice = createSlice({
  name: 'forgot',
  initialState,
  reducers: {
    setResetPasswordStatus: (state, action) => {
      state.resetPasswordStatus = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(forgotFetchAPi.pending, (state) => {
      state.isVerify = true
    })
    builder.addCase(forgotFetchAPi.fulfilled, (state, { payload }) => {
      state.isVerify = false
      if (payload?.data?.status_code === 200) {
        state.forgotModal = {
          ...state.forgotModal,
          isVisible: true,
          email: payload?.email || null,
        }
      }
    })
    builder.addCase(forgotFetchAPi.rejected, (state, { payload }) => {
      state.isVerify = false
      toast.error(payload as string)
    })
    builder.addCase(forgotOtpVerifyApi.pending, (state) => {
      state.isVerified = true
    })
    builder.addCase(forgotOtpVerifyApi.fulfilled, (state, { payload }) => {
      state.isVerified = false
      if (payload?.status_code === 200) {
        state.forgotModal = {
          ...state.forgotModal,
          isVisible: false,
          otpVerified: true,
        }
        toast.success(payload?.message as string)
      }
    })
    builder.addCase(forgotOtpVerifyApi.rejected, (state, { payload }: any) => {
      state.isVerified = false
      toast.error(payload.length > 0 ? payload : SOMETHING_WENT_WRONG)
    })
    builder.addCase(resetPasswordApi.pending, (state) => {
      state.isPasswordChange = true
    })
    builder.addCase(resetPasswordApi.fulfilled, (state, { payload }) => {
      state.isPasswordChange = false
      if (payload?.status_code === 200) {
        state.forgotModal = {
          ...state.forgotModal,
          isVisible: false,
          otpVerified: false,
        }
        if (payload?.message === 'Password has been changed successfully') {
          toast.success(payload?.message, {
            style: {
              maxWidth: 500,
            },
          })
        } else {
          toast.success(payload?.message)
        }
        state.resetPasswordStatus = payload?.status_code
        Cookies.remove('user_mail')
      }
    })
    builder.addCase(resetPasswordApi.rejected, (state, { payload }: any) => {
      state.isPasswordChange = false
      toast.error(payload === '' ? SOMETHING_WENT_WRONG : payload)
    })
  },
})

export const { setResetPasswordStatus } = ForgotPasswordSlice.actions
export default ForgotPasswordSlice.reducer
