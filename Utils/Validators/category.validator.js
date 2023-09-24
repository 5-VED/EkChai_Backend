const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');

const categoryValidator = (req, res, next) => {
    const expected = Joi.object({
        name: Joi.string().min(3).max(15).required()
    })
    const actual = {
        name: req.body.name
    }
    const { error } = expected.validate(actual);
    if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: error.message
        })
    }
    next();
}

module.exports = {
    categoryValidator
}

