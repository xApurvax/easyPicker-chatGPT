import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import ApiMiddleware from "../../utils/ApiMiddleware";
import { GiTwoCoins } from 'react-icons/gi';
import coins from "../../sound/coins.mp3"
import Cookies from "js-cookie";

const initialState = {
  isLoading: false,
  isLoadingTransactionHistory: false,
  showBuyPointsModal:false,
  allTransactionHistory: [],
  totalResults: 0,
};


export const BuyPointsFetchAPi = createAsyncThunk(
  'BuyPoints/fetch',
  async (data, {rejectWithValue}) => {
    try {
      const response = await ApiMiddleware.post(
        '/api/upgrade/points/',
        {...data}
      );
      return response;
    } catch (error) {
      if (!error.response) {
        throw rejectWithValue(error);
      }
      throw rejectWithValue(error.response.data.message);
    }
  }
);

export const transactionHistoryFetchAPi = createAsyncThunk(
  'transactionHistory/fetch',
  async (data, {rejectWithValue} ) => {
    try {
      const response = await ApiMiddleware.get(
        `/api/upgrade/points/?date=${data?.date || ""}&page=${data?.page || ""}&dsc=${data?.order || ""}&page_size=5`,
        {...data}
      );
      return response;
    } catch (error) {
      if (!error.response) {
        throw rejectWithValue(error);
      }
      throw rejectWithValue(error.response.data.message);
    }
  }
);

const pointsSlice = createSlice({
  name: "pointsSlice",
  initialState,
  reducers: {
    setShowBuyPointsModal: (state, action) => {
      state.showBuyPointsModal = action.payload;
    },
  },
  extraReducers: {
    [BuyPointsFetchAPi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [BuyPointsFetchAPi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.showBuyPointsModal = false;
      toast.success(action?.payload?.data?.message);
    },
    [BuyPointsFetchAPi.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [transactionHistoryFetchAPi.pending]: (state, action) => {
      state.isLoadingTransactionHistory = true;
    },
    [transactionHistoryFetchAPi.fulfilled]: (state, action) => {
      state.isLoadingTransactionHistory = false;
      // state.allTransactionHistory = action?.payload?.data?.result[0]?.history;
      state.allTransactionHistory = action?.payload?.data?.results;
      // state.totalResults = action?.payload?.data?.result[0]?.history?.length;
      state.totalResults = action?.payload?.data?.count;
      if(action?.payload?.data?.count === 0){
        toast.error("No records found try changing filter")
      }
      // }
    },
    [transactionHistoryFetchAPi.rejected]: (state, action) => {
      state.isLoadingTransactionHistory = false;
    },
  },
});

export const { setShowBuyPointsModal } = pointsSlice.actions;
export default pointsSlice.reducer;