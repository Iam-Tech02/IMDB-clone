import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const mostPopularMovies = createAsyncThunk(
  'mostPopular/mostPopularMovies',
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        'https://imdb236.p.rapidapi.com/imdb/most-popular-movies',
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

const mostPopularSlice = createSlice({
  name: 'mostPopular',
  initialState: {
    moviesList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(mostPopularMovies.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(mostPopularMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.moviesList = action.payload;
      })
      .addCase(mostPopularMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default mostPopularSlice.reducer;
