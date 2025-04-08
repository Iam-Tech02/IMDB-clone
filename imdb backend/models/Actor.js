const mongoose = require('mongoose');

const producerSchema = new mongoose.Schema({
  name: String,
  company: String
});

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  releaseDate: Date,
  genre: String,
  poster: String,
  producers: [producerSchema]
});

const actorSchema = new mongoose.Schema({
  name: String,
  age: Number,
  image: String,
  movies: [movieSchema]
});

module.exports = mongoose.model('Actor', actorSchema);
