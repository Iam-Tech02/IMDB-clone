import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (query) => {
    const url = `https://imdb146.p.rapidapi.com/v1/find/?query=${encodeURIComponent(query)}`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "7ae27d8682msh406019f5f9556b7p11b241jsn0a6d6363f4ce",
        "X-RapidAPI-Host": "imdb146.p.rapidapi.com",
      },
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error("Failed to fetch search results");
    }

    const data = await res.json();
    return data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearSearchResults: (state) => {
      state.results = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
