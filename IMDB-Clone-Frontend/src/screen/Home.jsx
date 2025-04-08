import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Alert } from 'react-bootstrap';
import CarouselComponent from './Carousel';
import MovieCarousel from './MovieCarousel';
import TrendingCelebs from './ActorsListCarousel';

import { mostPopularMovies } from '../redux/src/ features/mostPopularMoviesSlice';
import { topRatedIndianMovies } from '../redux/src/ features/topRatedIndianMoviesSlice';
import { topRatedEnglishMovies } from '../redux/src/ features/topRatedEnglishMoviesSlice';
import { fetchTopBoxOffice } from '../redux/src/ features/topBoxOfficeMoviesSlice';
import { fetchPopularActors } from '../redux/src/ features/popularActorsSlice';
import AddedMovies from "./AddedMovies"
const Home = () => {

  const dispatch = useDispatch();

  const { 
    moviesList: popularMovies, 
    status: popularStatus, 
    error: popularError 
  } = useSelector((state) => state.mostPopularMovies);

  const {
    topRatedIndianMoviesList: indianMovies,
    topRatedIndianMoviesStatus: indianStatus,
    topRatedIndianMoviesError: indianError,
  } = useSelector((state) => state.topRatedIndian);

  const {
    topRatedEnglishMoviesList: englishMovies,
    topRatedEnglishMoviesStatus: englishStatus,
    topRatedEnglishMoviesError: englishError,
  } = useSelector((state) => state.topRatedEnglish);

  const {
    list: boxOfficeMovies,
    status: boxOfficeStatus,
    error: boxOfficeError,
  } = useSelector((state) => state.topBoxOffice);

  const {
    list: trendingCelebs,
    status: celebsStatus,
    error: celebsError,
  } = useSelector((state) => state.popularActors);

  useEffect(() => {
    dispatch(mostPopularMovies());
    dispatch(topRatedIndianMovies());
    dispatch(topRatedEnglishMovies());
    dispatch(fetchTopBoxOffice());
    dispatch(fetchPopularActors());
  }, [dispatch]);

  
  return (
    <div className="bg-black homeParent text-white" style={{ minHeight: '100vh' }}>
      <div className="mb-5 homeTrailersCarousel">
        <CarouselComponent />
      </div>

      <div className="container">

          <section className="mb-5">
          <h2 className="mb-4">Custom Movies</h2>
          {popularStatus === 'failed' ? (
            <Alert variant="danger">Error loading popular movies: {popularError}</Alert>
          ) : (
            <AddedMovies/>
          )}
        </section>

        <section className="mb-5">
          <h2 className="mb-4">Most Popular</h2>
          {popularStatus === 'failed' ? (
            <Alert variant="danger">Error loading popular movies: {popularError}</Alert>
          ) : (
            <MovieCarousel
              movies={popularMovies}
              loading={popularStatus === 'loading'}
            />
          )}
        </section>

        <section className="mb-5">
          <h2 className="mb-4">Top Rated Indian Movies</h2>
          {indianStatus === 'failed' ? (
            <Alert variant="danger">Error loading Indian movies: {indianError}</Alert>
          ) : (
            <MovieCarousel
              movies={indianMovies}
              loading={indianStatus === 'loading'}
            />
          )}
        </section>

        <section className="mb-5">
          <h2 className="mb-4">Top Rated English Movies</h2>
          {englishStatus === 'failed' ? (
            <Alert variant="danger">Error loading English movies: {englishError}</Alert>
          ) : (
            <MovieCarousel
              movies={englishMovies}
              loading={englishStatus === 'loading'}
            />
          )}
        </section>

        <section className="mb-5">
          <h2 className="mb-4">Top Box Office</h2>
          {boxOfficeStatus === 'failed' ? (
            <Alert variant="danger">Error loading box office: {boxOfficeError}</Alert>
          ) : (
            <MovieCarousel
              movies={boxOfficeMovies}
              loading={boxOfficeStatus === 'loading'}
            />
          )}
        </section>

        <section className="">
          <h2 className="text-center mb-4">Trending Celebrities</h2>
          {celebsStatus === 'loading' ? (
            <div className="text-center">
              <Spinner animation="border" variant="light" />
              <p className="mt-2">Loading celebrities...</p>
            </div>
          ) : celebsError ? (
            <Alert variant="danger" className="text-center">
              Error loading celebrities: {celebsError}
            </Alert>
          ) : (
            <TrendingCelebs data={trendingCelebs} />
          )}
        </section>
      </div>
    </div>
  );


 };

export default Home;