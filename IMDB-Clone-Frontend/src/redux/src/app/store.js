import { configureStore } from '@reduxjs/toolkit';
import top250Movies from '../ features/top250Movies/top250MoviesSlice';
import mostPopularMoviesSlice from '../ features/mostPopularMoviesSlice';
import topRatedIndianReducer from '../ features/topRatedIndianMoviesSlice'
import  topRatedEnglishMoviesSlice  from '../ features/topRatedEnglishMoviesSlice';
import topBoxOfficeReducer from '../ features/topBoxOfficeMoviesSlice';
import searchReducer from '../ features/searchSlice';
import popularActorsReducer from '../ features/popularActorsSlice'
import addedMoviesSlice from '../ features/AddedMovies'

export const store = configureStore({
  reducer: {
    top250Movies: top250Movies,
    mostPopularMovies: mostPopularMoviesSlice,
    topRatedIndian: topRatedIndianReducer, 
    topRatedEnglish:topRatedEnglishMoviesSlice,
    topBoxOffice: topBoxOfficeReducer,
    search: searchReducer,
    popularActors: popularActorsReducer,
    addedMovies:addedMoviesSlice,
  },
});
