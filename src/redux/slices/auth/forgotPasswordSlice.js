import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiMiddleware from "../../../utils/ApiMiddleware";
import Cookies from "js-cookie";
import toast, { Toaster } from 'react-hot-toast';


const initialState = {
  isVerify: false,
  isVerified: false,
  isPasswordChange: false,
//   allData: {
//     token: {
//         access: Cookies.get('access_token'),
//         refresh: Cookies.get('refresh_token'),
//     },
//   },
  forgotModal: { email: null, isVisible: false, otpVerified: false },
  resetPasswordStatus:null,
};

export const forgotFetchAPi = createAsyncThunk(
  'forgot-password/fetch',
  async (data, { rejectWithValue }) => {
    try {
      const forgotPassword = await ApiMiddleware.post(
        'api/auth/password/reset/email/',
        {...data}
      );
      Cookies.set('user_mail',data.email);
      toast.success(forgotPassword.data.message)
      return {...forgotPassword,...data};
    } catch (error) {
      // console.log(error.response.data.message);
      // toast.error(error.response.data.message)
      if (!error.response) {
        throw rejectWithValue(error);
    }
    throw rejectWithValue(error.response.data.message);
    }
  }
);

export const forgotOtpVerifyApi = createAsyncThunk("/auth/otp-verify", async (values, { rejectWithValue }) => {
  try {
      const response = await ApiMiddleware.post("/api/auth/password/reset/otp/", {
          ...values,
      });
      // toast.success(response.data.message)
      return response.data;
  } catch (error) {
    console.log(error.response.data.message);
    // toast.error(error.response.data.message)
      if (!error.response) {
          throw rejectWithValue(error);
      }
      throw rejectWithValue(error.response.data.message);
  }
});

export const resetPasswordApi = createAsyncThunk("/auth/reset-password", async (values, { rejectWithValue }) => {
  try {
      const response = await ApiMiddleware.post("/api/auth/password/reset/", {
          ...values,
      });
      return response.data;
  } catch (error) {
      if (!error.response) {
          throw rejectWithValue(error);
      }
      throw rejectWithValue(error.response.data.message);
  }
});


const forgotPasswordSlice = createSlice({
  name: "forgot",
  initialState,
  reducers: {
        setResetPasswordStatus: (state, action) => {
          state.resetPasswordStatus = action.payload;
        },
        // setIsIncPowerWords: (state, action) => {
        //   state.isIncPowerWords = action.payload;
        // },
        // setIsMakeQuestion: (state, action) => {
        //   state.isMakeQuestion = action.payload;
        // },
        // setGoBackToHeadlineSettings: (state, action) => {
        //   state.goBackToSettings = action.payload;
        // },
  },
  extraReducers: {
    [forgotFetchAPi.pending]: (state, action) => {
      state.isVerify = true;
    },
    [forgotFetchAPi.fulfilled]: (state, {payload}) => {
      state.isVerify = false;
      if(payload?.data?.status_code === 200) {
      state.forgotModal = {
        ...state.forgotModal,
        isVisible: true,
        email: payload?.email || null
      };
    }
    //   state.allData = action.payload?.data?.result[0];
    //   Cookies.set("access_token", action.payload?.data?.result[0]?.token?.access);
    //   Cookies.set("refresh_token", action.payload?.data?.result[0]?.token?.refresh);
    },
    [forgotFetchAPi.rejected]: (state, action) => {
      state.isVerify = false;
      toast.error(action?.payload);
    },
    [forgotOtpVerifyApi.pending]: (state) => {
      state.isVerified = true;
    },
    [forgotOtpVerifyApi.fulfilled]: (state, { payload }) => {
        state.isVerified = false;
        if(payload?.status_code === 200) {
        state.forgotModal = { ...state.forgotModal, isVisible: false, otpVerified: true };
        toast.success(payload?.message);
        }
    },
    [forgotOtpVerifyApi.rejected]: (state, { payload }) => {
        state.isVerified = false;
        toast.error(payload === '' ? "Something went wrong!" : payload);
    },
    [resetPasswordApi.pending]: (state) => {
      state.isPasswordChange = true;
    },
    [resetPasswordApi.fulfilled]: (state, { payload }) => {
        state.isPasswordChange = false;
        if(payload?.status_code === 200) {
        state.forgotModal = { ...state.forgotModal, isVisible: false, otpVerified: false };
        toast.success(payload?.message);
        state.resetPasswordStatus = payload?.status_code;
        Cookies.remove('user_mail')
        }
    },
    [resetPasswordApi.rejected]: (state, { payload }) => {
        state.isPasswordChange = false;
        toast.error(payload === '' ? "Something went wrong!" : payload);
    },
  },
});

export const { setResetPasswordStatus } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;