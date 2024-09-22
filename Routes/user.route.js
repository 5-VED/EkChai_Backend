const express = require('express');
const router = express.Router();

const { signUp, signIn, changePassword, users, checkToken, updateStatus } = require('../Controllers/user.controller');
const { SignUpValidator, SignInValidator } = require('../Utils/Validators/user.validators')
const { authenticateToken, checkRole } = require('../Config/authenticate')

// route to create new User
router.post('/signup', SignUpValidator, signUp);

// route to SignIn User
router.post('/signin', SignInValidator, signIn);

// API to Change Password
router.post('/changePassword', SignInValidator, authenticateToken, changePassword);

// API to get all users
router.get('/users',  users);

// API to Check Authentication token
router.get('/checktoken', authenticateToken, checkToken);

// API to See Update Status
router.put('/updateStatus/:id', authenticateToken, checkRole, updateStatus);

module.exports = router 