import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ApiMiddleware from '../../../utils/ApiMiddleware'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import { SOMETHING_WENT_WRONG } from '../../../utils/constant'

interface RegisterState {
  isRegisterLoading: boolean
  allData: {
    token: {
      access?: string
      refresh?: string
    }
  }
  message?: string
}

interface RegisterUser {
  data: {
    message: string
    result: [
      {
        token: {
          access: string
          refresh: string
        }
      }
    ]
  }
}

interface RejectedWithValue {
  message: string
}

interface RegisterData {
  [key: string]: any
}

export const registerFetchAPi = createAsyncThunk<
  RegisterUser,
  RegisterData,
  { rejectValue: RejectedWithValue }
>('register/fetch', async (data, { rejectWithValue }) => {
  try {
    const registerUser = await ApiMiddleware.post('/api/auth/register/', {
      ...data,
    })
    toast.success(registerUser.data.message)
    return registerUser
  } catch (error: any) {
    if (!error.response) {
      throw rejectWithValue({ message: error?.message || SOMETHING_WENT_WRONG })
    }
    throw rejectWithValue({ message: error.response.data.message })
  }
})

const initialState: RegisterState = {
  isRegisterLoading: false,
  allData: {
    token: {
      access: Cookies.get('access_token'),
      refresh: Cookies.get('refresh_token'),
    },
  },
}

const RegisterSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerFetchAPi.pending, (state) => {
      state.isRegisterLoading = true
    })
    builder.addCase(registerFetchAPi.fulfilled, (state, { payload }) => {
      state.isRegisterLoading = false
      state.message = payload.data.message
      if (payload?.data?.result[0]?.token?.access) {
        state.allData = payload?.data?.result[0]
        Cookies.set('coins', 1000)
        Cookies.set('access_token', payload?.data?.result[0]?.token?.access)
        Cookies.set('refresh_token', payload?.data?.result[0]?.token?.refresh)
      }
    })
    builder.addCase(registerFetchAPi.rejected, (state, { payload }: any) => {
      state.isRegisterLoading = false
      toast.error(payload?.message)
    })
  },
})

export default RegisterSlice.reducer
