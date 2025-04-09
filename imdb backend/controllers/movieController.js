const fs = require('fs');
const path = require('path');
const Movie = require('../models/Movie');
const movieSchema = require('../validations/movieValidation');
const connectDB = require('../config/db');

exports.createMovie = async (req, res) => {
    try {
      if (req.body.actors) {
        req.body.actors = JSON.parse(req.body.actors);
      }
      if (req.body.directors) {
        req.body.directors = JSON.parse(req.body.directors);
      }
  
      const { error } = await movieSchema.validate(req.body);
      console.log("error", error);
      if (error) return res.status(400).json({ error: error.details[0].message });
  
      const posterPath = req.file ? `/uploads/${req.file.filename}` : null;
  
      if (!posterPath) return res.status(400).json({ error: 'Poster file is required' });
  
      const movie = new Movie({ ...req.body, poster: posterPath });
      await movie.save();
  
      res.status(201).json({ message: 'Movie created successfully', movie });
    } catch (err) {
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  };
  
exports.getAllMovies = async (req, res) => {
  try {
    await connectDB()
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};



exports.updateMovie = async (req, res) => {
    try {
      const movieId = req.params.id;
  
      if (req.body.actors) {
        req.body.actors = JSON.parse(req.body.actors);
      }
      if (req.body.directors) {
        req.body.directors = JSON.parse(req.body.directors);
      }
  
      const { error } = await movieSchema.validate(req.body);
      if (error) return res.status(400).json({ error: error.details[0].message });
  
      const movie = await Movie.findById(movieId);
      if (!movie) return res.status(404).json({ error: 'Movie not found' });
  
      if (req.file) {
        const oldPosterPath = path.join(__dirname, '..', 'uploads', path.basename(movie.poster));
        if (fs.existsSync(oldPosterPath)) {
          fs.unlinkSync(oldPosterPath);
        }
  
        req.body.poster = `/uploads/${req.file.filename}`;
      }
  
      const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, { new: true });
  
      res.status(200).json({ message: 'Movie updated successfully', movie: updatedMovie });
    } catch (err) {
      console.error('Error updating movie:', err);
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  };
  


exports.deleteMovie = async (req, res) => {
    try {
      const movieId = req.params.id;
  
      const movie = await Movie.findById(movieId);
      if (!movie) return res.status(404).json({ error: 'Movie not found' });
  
      if (movie.poster) {
        const posterPath = path.join(__dirname, '..', movie.poster);
        if (fs.existsSync(posterPath)) {
          fs.unlinkSync(posterPath); 
        }
      }
  
      await Movie.findByIdAndDelete(movieId);
  
      res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (err) {
      console.error('Error deleting movie:', err);
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  };
