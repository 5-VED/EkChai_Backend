/*
To Validate Sign up and Sign in Forms
**/
const httpStatusCodes = require('http-status-codes')
const Joi = require('joi');

/**
 * Sign up Form Validator
 */
const SignUpValidator = (req, res, next) => {
    const expected = Joi.object({
        name: Joi.string().alphanum().min(3).max(15).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,15}$')).required(),
        confirmPassword: Joi.ref('password')
    })
    const actual = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }

    const { error } = expected.validate(actual)
    if (error) {
        return res.status(httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            error: error.message
        })
    }
    next();
}

/**
 * Sign In Form Validator
 */
const SignInValidator = (req, res, next) => {
    const expected = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,15}$')).required()
    })
    const actual = {
        email: req.body.email,
        password: req.body.password
    }
    const { error } = expected.validate(actual)
    if (error) {
        return res.status(httpStatusCodes.StatusCodes.BAD_REQUEST).json({
            error: error.message
        })
    }
    next(); 
}

module.exports = { SignUpValidator, SignInValidator }