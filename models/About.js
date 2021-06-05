const mongoose = require("mongoose")

const aboutSchema = new mongoose.Schema({
    text: {
        type: String,
        required: false,
        default:''
    },

   
  
   
})



module.exports = mongoose.model('About', aboutSchema)