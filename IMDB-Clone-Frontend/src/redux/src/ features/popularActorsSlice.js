import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPopularActors = createAsyncThunk(
  'actors/fetchPopularActors',
  async (_, { rejectWithValue }) => {
    const url = 'https://imdb232.p.rapidapi.com/api/actors/get-most-popular?limit=25';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '7ae27d8682msh406019f5f9556b7p11b241jsn0a6d6363f4ce',
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
