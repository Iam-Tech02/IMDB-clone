const Joi = require('joi');

exports.actorSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().min(0).required(),
  movies: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      year: Joi.number().min(1888).required(),
      releaseDate: Joi.date().required(),
      genre: Joi.string().required(),
      poster: Joi.string().uri().optional(), 
      video: Joi.string().uri().optional(),
      producers: Joi.array().items(
        Joi.object({
          name: Joi.string().required(),
          company: Joi.string().required()
        })
      ).min(1).required()
    })
  ).min(1).required()
});
