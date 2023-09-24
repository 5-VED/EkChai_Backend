const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
require('dotenv').config()

/**
 * Middleware to authenticate jwt token
 */
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) return res.status(StatusCodes.UNAUTHORIZED).json({ "message": "Unauthorized" })
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, response) => {
        if (err) {
            return res.status(StatusCodes.FORBIDDEN).json({ "message": "Forbidden" })
        }
        res.locals = response;
        next();
    });
}

/**
 * Middleware to check user role
 */
const checkRole = (req, res, next) => {
    if (res.locals.roles === process.env.usere) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ "message": "Unauthorized" })
    } else {
        next();
    }
}

module.exports = { authenticateToken, checkRole }