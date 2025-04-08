import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const topRatedIndianMovies = createAsyncThunk(
  'topRated/topRatedIndianMovies',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        'https://imdb236.p.rapidapi.com/imdb/india/top-rated-indian-movies',
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'imdb236.p.rapidapi.com',
            'x-rapidapi-key': '67ef03508bmsh774b26c5ef6182dp1d5fd1jsn4afd79c18273',
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const topRatedIndianMoviesSlice = createSlice({
  name: 'topRatedIndian',
  initialState: {
    topRatedIndianMoviesList: [],
    topRatedIndianMoviesStatus: 'idle',
    topRatedIndianMoviesError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(topRatedIndianMovies.pending, (state) => {
        state.topRatedIndianMoviesStatus = 'loading';
        state.topRatedIndianMoviesError = null;
      })
      .addCase(topRatedIndianMovies.fulfilled, (state, action) => {
        state.topRatedIndianMoviesStatus = 'succeeded';
        state.topRatedIndianMoviesList = action.payload;
      })
      .addCase(topRatedIndianMovies.rejected, (state, action) => {
        state.topRatedIndianMoviesStatus = 'failed';
        state.topRatedIndianMoviesError = action.payload || 'Something went wrong';
      });
  },
});
export default topRatedIndianMoviesSlice.reducer;
