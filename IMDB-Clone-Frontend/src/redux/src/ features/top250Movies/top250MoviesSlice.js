import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTop250Movies = createAsyncThunk(
  'movies/fetchTop250Movies',
  async () => {
    const response = await fetch(
      'https://imdb236.p.rapidapi.com/imdb/top250-movies',
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'imdb236.p.rapidapi.com',
          'x-rapidapi-key': '7ae27d8682msh406019f5f9556b7p11b241jsn0a6d6363f4ce',
        },
      }
    );
    const data = await response.json();
    return data;
  }
);

const mostPopularMoviesSlice = createSlice({
  name: 'movies',
  initialState: {
    moviesList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTop250Movies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTop250Movies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.moviesList = action.payload;
      })
      .addCase(fetchTop250Movies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default mostPopularMoviesSlice.reducer;
