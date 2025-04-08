const Joi = require('joi');

exports.signupSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    city: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });
  
  exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });
  