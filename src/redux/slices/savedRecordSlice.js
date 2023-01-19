import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import ApiMiddleware from "../../utils/ApiMiddleware";
import { GiTwoCoins } from 'react-icons/gi';
import coins from "../../sound/coins.mp3"
import Cookies from "js-cookie";

const initialState = {
  isLoading: false,
  isRegenerate: false,
  saveResultsData:[],
  totalResults:1,
};

export const saveResultsDataFetchAPi = createAsyncThunk(
  'saveResultsFetch/fetch',
  async (data, {rejectWithValue} ) => {
    try {
      const response = await ApiMiddleware.get(
        // `/search/?page=2`,
        `/api/search/heading/?search=${data?.search || ""}&page=${data?.page || "1"}`,
        {...data}
      );
      return response;
    } catch (error) {
      if(error.response.data.message !== "You dont have any credit points"){
        toast.error(error.response.data.message)
      }
      if (!error.response) {
        throw rejectWithValue(error);
      }
      throw rejectWithValue(error.response.data.message);
    }
  }
);


const savedRecordSlice = createSlice({
  name: "saveRecordSlice",
  initialState,
  reducers: {
    // setIsFindUseSynonyms: (state, action) => {
    //   state.isFindUseSynonyms = action.payload;
    // },
    // setIsIncPowerWords: (state, action) => {
    //   state.isIncPowerWords = action.payload;
    // },
    // setIsMakeQuestion: (state, action) => {
    //   state.isMakeQuestion = action.payload;
    // },
    // setGoBackToHeadlineSettings: (state, action) => {
    //   state.goBackToSettings = action.payload;
    // },
    // setReGenerateData: (state, action) => {
    //   state.reGenerateData = action.payload;
    // },
  },
  extraReducers: {
    [saveResultsDataFetchAPi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [saveResultsDataFetchAPi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.saveResultsData = action?.payload?.data?.results;
      state.totalResults = action?.payload?.data?.count;
    },
    [saveResultsDataFetchAPi.rejected]: (state, action) => {
      state.isLoading = false;
    }
  },
});

// export const { setIsFindUseSynonyms,setIsIncPowerWords,setIsMakeQuestion,setGoBackToHeadlineSettings,setReGenerateData } = generateHeadlineSlice.actions;
export default savedRecordSlice.reducer;