const userHelper = require('../Helpers/user.helper');
    const { StatusCodes } = require('http-status-codes');
const User = require("../Models/user.model");
const bcrypt = require("bcrypt");


/**
 * @action API to Sign Up
 * @method POST
 * @route http://localhost:3000/signup
 **/
exports.signUp = async (req, res) => {
    try {
        const result = await userHelper.signUp(req.body);
        console.log("========= result===>", result)
        if (result['userExists']) {
            res.status(StatusCodes.CONFLICT).json({
                data: result,
                message: 'Email Address Already Taken'
            })
            return;
        }
        return res.status(StatusCodes.OK).json({
            data: result,
            message: 'Signup successful'
        })
    } catch (error) {
        console.log(error)
    }
}

/**
 * @action API to Sign In
 * @method POST
 * @route http://localhost:3000/signin
 **/
exports.signIn = async (req, res) => {
    try {

        const result = await userHelper.signIn(req.body)

        if (result.login) {
            return res.status(StatusCodes.OK).json({
                message: result.message,
                data: result.data,
                token: result.accessToken
            })
        }
        if (result.login === false && result.status === false) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                data: result.data,
                message: result.message
            })
        }
        return res.status(StatusCodes.UNAUTHORIZED).json({
            data: result.data,
            message: result.message
        })

    } catch (error) {
        console.log(error)
    }
}

/**
* @action API to get Users
* @method GET
* @route http://localhost:3000/users
**/
exports.users = async (req, res) => {
    try {
        const result = await User.aggregate([
            {
                $match: { 'roles': 'USER' }
            }
        ]);

        if (result && result.length > 0) {
            return res.status(StatusCodes.OK).json({
                data: result,
                message: 'Users data fetched successfully'
            })
        }
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Some error occurred, Please try later",
            data: []
        })

    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Error' + error,
            data: []
        })
    }

}

/**
* @action API to check token
* @method GET
* @route http://localhost:3000/checktoken
**/
exports.checkToken = async (req, res) => {
    return res.status(StatusCodes.OK).json({ "message": "true" })
}

/**
* @action API to Update User Status
* @method PUT
* @route http://localhost:3000/updateStatus/:id
**/
exports.updateStatus = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: req.body.status } })
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "User status updated successfully",
            data: user.status
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Error while updating user status"
        })
    }
}

/**
* @action API to Change Password
* @method POST
* @route http://localhost:3000/changePassword
**/
exports.changePassword = async (req, res) => {
    try {
        const email = res.locals?.email;
        const result = await User.findOne({ email });
        if (!result) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User does not exist' })
        } else {
            let isPasswordCorrect = await bcrypt.compare(req.body.password, result.password);
            if (isPasswordCorrect) {
                let updatedPasswordHash = await bcrypt.hashSync(req.body['updatedPassword'], 10);
                await User.updateOne({ email }, {
                    $set: {
                        password: updatedPasswordHash
                    }
                });
                return res.status(StatusCodes.OK).json({
                    message: 'Password updated successfully'
                });
            } else {
                return res.status(StatusCodes.NOT_ACCEPTABLE).json({
                    message: 'Old password is incorrect'
                })
            }
        }

    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong, Please try again later' });
    }
}