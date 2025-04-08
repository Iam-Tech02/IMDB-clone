import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTopBoxOffice = createAsyncThunk(
  'topBoxOffice/fetchTopBoxOffice',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('https://imdb236.p.rapidapi.com/imdb/lowest-rated-movies ', {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'imdb236.p.rapidapi.com',
          'x-rapidapi-key': '67ef03508bmsh774b26c5ef6182dp1d5fd1jsn4afd79c18273',
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
