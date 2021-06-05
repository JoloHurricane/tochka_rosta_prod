const mongoose = require("mongoose")

const equipmentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: false,
        default:''
    },

   
  
   
})



module.exports = mongoose.model('Equipment', equipmentSchema)