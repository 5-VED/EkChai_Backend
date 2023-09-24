const { Schema, model } = require("mongoose");

const billSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    uuid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    total: {
        type: String,
        required: true
    },
    productDetails: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: String,
                required: true
            },
            total: {
                type: String,
                required: true
            },
            category: {
                type: String,
                required: true
            },
            quantity: {
                type: String,
                required: true
            }
        }
    ],
    createdBy: {
        type: String
    }
})

const Bill = model('Bill', billSchema);
module.exports = Bill;

