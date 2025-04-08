const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  poster: { type: String, required: false}, 
  actors: [{ type: String, required: true }],
  directors: [{ type: String, required: true }],
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
