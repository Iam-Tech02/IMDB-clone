const Joi = require('joi');

const movieSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  actors: Joi.array().items(Joi.string()).min(1).required(),
  directors: Joi.array().items(Joi.string()).min(1).required(),
  poster: Joi.string().optional()  
});

module.exports = movieSchema;
