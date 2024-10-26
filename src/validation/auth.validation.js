const Joi = require('joi');
const { AppError } = require('../exception/errorHandler');
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const options = {
    errors: {
      wrap: {
        label: '',
      },
    },
};

const validateSignupData = (data) => {
    const schema = Joi.object({
      firstName: Joi.string().label('First Name').required(),
      lastName: Joi.string().label('Last Name').required(),
      email: Joi.string().email().label('Email').pattern(emailRegex).required().messages({
        'string.email': 'Email is invalid.',
      }),
      password: Joi.string().label('Password').required(),
      repeatPassword: Joi.string().label('Confirm Password').valid(Joi.ref('password')).required().messages({
      'any.only': 'Password and confirm password must be same.',
    }),
      role: Joi.string().valid('Admin', 'Customer').required().label('Role')
    });
  
    const { error } = schema.validate(data, options);

    if (error) {
      throw new AppError(400, error.details[0].message)
    }
  };

  module.exports = validateSignupData