import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  isLoading: false,
  allTitles:null,
  isFindUseSynonyms: false,
  isIncPowerWords: true,
  isMakeQuestion: false,
  goBackToSettings: true,
};

export const generateHeadlineFetchAPi = createAsyncThunk(
  'generateHeadlinePage/fetch',
  async (data) => {
    try {
      const paragraphDetails = await axios.post(
        'http://Dipika.pythonanywhere.com/',
        data
      );
      return paragraphDetails;
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
);

const generateHeadlineSlice = createSlice({
  name: "GenerateHeadline",
  initialState,
  reducers: {
    setIsFindUseSynonyms: (state, action) => {
      state.isFindUseSynonyms = action.payload;
    },
    setIsIncPowerWords: (state, action) => {
      state.isIncPowerWords = action.payload;
    },
    setIsMakeQuestion: (state, action) => {
      state.isMakeQuestion = action.payload;
    },
    setGoBackToHeadlineSettings: (state, action) => {
      state.goBackToSettings = action.payload;
    },
  },
  extraReducers: {
    [generateHeadlineFetchAPi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [generateHeadlineFetchAPi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.goBackToSettings = false;
      state.allTitles = action.payload?.data?.title;
    },
    [generateHeadlineFetchAPi.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { setIsFindUseSynonyms,setIsIncPowerWords,setIsMakeQuestion,setGoBackToHeadlineSettings } = generateHeadlineSlice.actions;
export default generateHeadlineSlice.reducer;