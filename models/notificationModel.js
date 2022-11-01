const mongoose = require("mongoose");

const notiSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model("Notifications", notiSchema)