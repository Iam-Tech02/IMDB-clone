import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPopularActors = createAsyncThunk(
  'actors/fetchPopularActors',
  async (_, { rejectWithValue }) => {
    const url = 'https://imdb232.p.rapidapi.com/api/actors/get-most-popular?limit=25';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '67ef03508bmsh774b26c5ef6182dp1d5fd1jsn4afd79c18273',
        'x-rapidapi-host': 'imdb232.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();      
      return data;

    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch popular actors');
    }
  }
);

const popularActorsSlice = createSlice({
  name: 'popularActors',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularActors.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPopularActors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchPopularActors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default popularActorsSlice.reducer;