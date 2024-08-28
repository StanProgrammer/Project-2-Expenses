const Joi = require('joi');
const messages = require('./messages');

const userValidationSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': messages.user.name,
    }),
    email: Joi.string().email().required().messages({
        'string.email': messages.user.email,
        'string.empty': messages.user.email,
    }),
    password: Joi.string().min(8).required().messages({
        'string.min': messages.user.password,
        'string.empty': messages.user.password,
    }),
    phone: Joi.string().pattern(/^[0-9]+$/).required().messages({
        'string.pattern.base': messages.user.phone,
        'string.empty': messages.user.phone,
    })
});

module.exports = {
    userValidationSchema
};
