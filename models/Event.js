const { Schema, model } = require('mongoose')
const fullDateNow = require("../functions/dateFunc")
const date =  Date.now()
const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  createdAt:{
      type:String,
      default:fullDateNow()

  },
  date:{
    type:String,
    default:date
},
createdEnd:{
    type:String,
    default:""
}
})

module.exports = model('Event', eventSchema)