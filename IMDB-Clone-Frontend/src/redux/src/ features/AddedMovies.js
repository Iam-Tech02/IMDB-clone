import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get('https://imdb-clone-be-production.up.railway.app/api/movies');
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || 'Failed to fetch movies';
    return rejectWithValue(message);
  }
});

export const addMovie = createAsyncThunk('movies/addMovie', async (formData, { rejectWithValue }) => {
  try {
    const res = await axios.post('https://imdb-clone-be-production.up.railway.app/api/movies', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || 'Failed to add movie';
    return rejectWithValue(message);
  }
});

export const updateMovie = createAsyncThunk(
  'movies/updateMovie',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`https://imdb-clone-be-production.up.railway.app/api/movies/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update movie';
      return rejectWithValue(message);
    }
  }
);

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id, thunkAPI) => {
  try {
    await axios.delete(`https://imdb-clone-be-production.up.railway.app/api/movies/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || 'Failed to delete movie');
  }
});

const moviesSlice = createSlice({
  name: 'addedMovies',
  initialState: {
    movies: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchMovies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addMovie
      .addCase(addMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
        state.loading = false;
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateMovie
      .addCase(updateMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.movies = state.movies.map((movie) =>
          movie._id === action.payload._id ? action.payload : movie
        );
        state.loading = false;
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteMovie
      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter((movie) => movie._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;
