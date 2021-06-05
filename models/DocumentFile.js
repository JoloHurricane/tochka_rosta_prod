const mongoose= require("mongoose")
const fullDateNow = require("../functions/dateFunc")



const documentFileSchema = new mongoose.Schema({
  
 
    createdAt: {
        type: String,
        default: fullDateNow()
    },

    
    file: {
        type: String,
        default: 'file.txt',
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'DocumentCategory' }
})

module.exports = mongoose.model('DocumentFile', documentFileSchema)