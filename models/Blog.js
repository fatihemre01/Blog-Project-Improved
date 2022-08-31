const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    sharedBy: {
        type: String,
        default: null
    },
    userId: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model("Blog", blogSchema)