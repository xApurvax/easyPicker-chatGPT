import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiMiddleware from "../../../utils/ApiMiddleware";
import Cookies from "js-cookie";
import toast, { Toaster } from 'react-hot-toast';
import cookies from 'js-cookie';
import { Navigate } from "react-router-dom";

const initialState = {
  isSuccess: false,
  allData: {
    token: {
        access: Cookies.get('access_token'),
        refresh: Cookies.get('refresh_token'),
    },
  },
  coins:0,
  logOutModal: false,
};

export const loginFetchAPi = createAsyncThunk(
  'login/fetch',
  async (data, {rejectWithValue}) => {
    try {
      const loginCredentials = await ApiMiddleware.post(
        '/api/auth/login/',
        {...data}
      );
      toast.success(loginCredentials.data.message)
      return loginCredentials;
    } catch (error) {
      // // console.log(error.response.data.message);
      // toast.error(error.response.data.message)
      if (!error.response) {
        // // console.log(error,"ttttttttttttttttt")
        toast.error(error?.message)
        throw rejectWithValue(error);
      }
      throw rejectWithValue(error.response.data.message);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logOut: (state) => {
      state.allData = {
          token: {
              access: null,
              refresh: null,
          },
      };
      cookies.remove('access_token');
      cookies.remove('refresh_token');
      state.logOutModal = false;
  },
  setLogOutModal: (state, action) => {
    state.logOutModal = action.payload;
  },
  },
  extraReducers: {
    [loginFetchAPi.pending]: (state, action) => {
      state.isSuccess = true;
    },
    [loginFetchAPi.fulfilled]: (state,{payload}) => {
      state.isSuccess = false;
      if(payload?.data?.status_code === 200) {
      state.allData = payload?.data?.result[0];
      state.coins = payload?.data?.result[0]?.avaliable_credit;
      Cookies.set("access_token", payload?.data?.result[0]?.token?.access);
      Cookies.set("refresh_token", payload?.data?.result[0]?.token?.refresh);
      Cookies.set("coins", payload?.data?.result[0]?.avaliable_credit);
      }
    },
    [loginFetchAPi.rejected]: (state, action) => {
      state.isSuccess = false;
      toast.error(action?.payload);
    },
  },
});

export const { logOut,setLogOutModal } = loginSlice.actions;
export default loginSlice.reducer;