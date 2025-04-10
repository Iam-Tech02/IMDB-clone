import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTopBoxOffice = createAsyncThunk(
  'topBoxOffice/fetchTopBoxOffice',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('https://imdb236.p.rapidapi.com/imdb/lowest-rated-movies ', {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'imdb236.p.rapidapi.com',
          'x-rapidapi-key': '7ae27d8682msh406019f5f9556b7p11b241jsn0a6d6363f4ce',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const topBoxOfficeSlice = createSlice({
  name: 'topBoxOffice',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopBoxOffice.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTopBoxOffice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchTopBoxOffice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default topBoxOfficeSlice.reducer;
