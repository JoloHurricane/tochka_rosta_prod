const mongoose = require("mongoose")
const fullDateNow = require("../functions/dateFunc")



const documentCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },


    createdAt: {
        type: String,
        default: fullDateNow()
    },

    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DocumentFile' }]
})

module.exports = mongoose.model('DocumentCategory', documentCategorySchema)