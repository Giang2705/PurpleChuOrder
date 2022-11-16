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
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: Object,
        required: true,
    },
    deliveredBy: {
        type: String,
    },
    cart: {
        type: Array,
        default: [],
    },
    amount: {
        type: Number,
    },
    images: [{
        public_id:{
            type: String,
            required: true,
        },
        url:{
            type: String,
            required: true
        }
    }],
    method: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Đang xử lý",
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model("Payments", paymentSchema)