const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: Object,
        required: true,
    },
    tokenId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },   
    cart: {
        type: Array,
        default: [],
    },
    amount: {
        type: Number,
    },
    status: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model("Payments", paymentSchema)