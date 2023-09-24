const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String
    },
    roles: {
        type: String,
        enum: ['ADMIN', 'USER', 'SUPER_ADMIN'],
        required: true,
        default: 'USER'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: false
})

const User = model('User', userSchema);
module.exports = User

