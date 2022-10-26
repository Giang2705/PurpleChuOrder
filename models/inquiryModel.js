const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
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
    subject: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        default: "Đã tiếp nhận",
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model("Inquiries", inquirySchema)