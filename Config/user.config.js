const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');
// const {authenticateToken} = require("./user.config");
require("dotenv").config();

/**
 * Configuring Nodemailer to send Mails
 **/
const transport = nodemailer.createTransport({
    service: 'gmail',
    // secure:true,
    // port:465,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

const mailOptions = {
    from: process.env.EMAIL,
    to: 'parmarved1@gmail.com',
    subject: 'testing',
    text: 'Hello'
}


// transport.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         console.log('====>', error)
//
//     } else {
//         console.log("Email send successfully");
//     }
// })






module.exports = {
    PORT: process.env.PORT,
    DB_CONNECT: process.env.DB_CONNECT,
}