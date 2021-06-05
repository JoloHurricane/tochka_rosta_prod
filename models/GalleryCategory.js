const mongoose = require("mongoose")
const fullDateNow = require("../functions/dateFunc")

const date =  Date.now()

const galleryCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

   
    description: {
        type: String,
        required: true,

    },
    createdAt: {
        type: String,
        default: fullDateNow()
    },
    date:{
        type:String,
        default:date
    },

    
    img: {
        type: String,
        default: 'placeholder.jpg',
    },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GalleryImg' }]
})

module.exports = mongoose.model('GalleryCategory', galleryCategorySchema)