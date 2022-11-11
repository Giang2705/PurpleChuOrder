const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_id:{
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    slot: {
        type: Number,
        default: null,
    },
    description: {
        type: String,
        required: true,
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
    category: {
        type: String,
        required: true,
    },
    version: [{
        ver: {
            type: String,
            default: "",
        },
        price: {
            type: Number,
            trim: true,
            required: true,
        },
        checked: {
            type: Boolean,
            default: false,
        }
    }],

    checked: {
        type: Boolean,
        default: false,
    }, 
    sold: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model("Products", productSchema)