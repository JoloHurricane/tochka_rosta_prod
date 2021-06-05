const mongoose= require("mongoose")
const fullDateNow = require("../functions/dateFunc")



const galleryImgSchema = new mongoose.Schema({
  
 
    createdAt: {
        type: String,
        default: fullDateNow()
    },

    
    img: {
        type: String,
        default: 'placeholder.jpg',
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'GalleryCategory' }
})

module.exports = mongoose.model('GalleryImg', galleryImgSchema)