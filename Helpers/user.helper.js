const User = require('../Models/user.model');
const { hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


/*
Sign In API helper
**/
exports.signIn = async (payload) => {

    const user = await User.findOne({
        email: payload.email.toString().toLowerCase(),
        isDeleted: false
    })

    let isPasswordCorrect = compareSync(payload.password, user.password);

    if (user && isPasswordCorrect) {
        const response = { email: user.email, roles: user.roles }
        const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' })
        if (user.status === false) {
            return {
                login: false,
                message: "Waiting for Admin Approval"
            }
        }
        return {
            login: true,
            message: "success",
            data: user,
            accessToken: accessToken
        }
    } else {
        return {
            login: false,
            message: "Invalid Credentials"
        }
    }
}

/*
Sign Up API helper
**/
exports.signUp = async (payload) => {


    const isUserExists = await User.findOne({
        email: payload.email.toString().toLowerCase(),
    });

    if (isUserExists) {
        return { userExists: true };
    }

    // Hashing the password
    let hashedPassword = await hashSync(payload.password, 10);
    let hashedConfirmPassword = await hashSync(payload.confirmPassword, 10);

    const newUser = await new User({
        name: payload.name,
        email: payload.email.toLowerCase(),
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword,
        roles: payload.roles,
        status: payload.status
    });
    return newUser.save();
};


