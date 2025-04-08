import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const topRatedEnglishMovies = createAsyncThunk(
  'topRated/topRatedEnglishMovies',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        'https://imdb236.p.rapidapi.com/imdb/top-rated-english-movies', 
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

const topRatedEnglishSlice = createSlice({
  name: 'topRatedEnglish',
  initialState: {
    topRatedEnglishMoviesList: [],
    topRatedEnglishMoviesStatus: 'idle',
    topRatedEnglishMoviesError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(topRatedEnglishMovies.pending, (state) => {
        state.topRatedEnglishMoviesStatus = 'loading';
        state.topRatedEnglishMoviesError = null;
      })
      .addCase(topRatedEnglishMovies.fulfilled, (state, action) => {
        state.topRatedEnglishMoviesStatus = 'succeeded';
        state.topRatedEnglishMoviesList = action.payload;
      })
      .addCase(topRatedEnglishMovies.rejected, (state, action) => {
        state.topRatedEnglishMoviesStatus = 'failed';
        state.topRatedEnglishMoviesError = action.payload || 'Something went wrong';
      });
  },
});

export default topRatedEnglishSlice.reducer;
