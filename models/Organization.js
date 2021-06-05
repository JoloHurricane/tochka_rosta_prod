const mongoose = require("mongoose")

const organizationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
        default:''
    },

   
    address: {
        type: String,
        required: false,
        default:''

    },
    phone: {
        type: String,
        required:false,
        default: ''
    },
    phoneAdditional:{
        type:String,
        required:false,
        default:''
    },
    email:{
        type:String,
        required:false,
        default:''
    },
    city:{
        type:String,
        required:false,
        default:''
    },
    map:{
        type:String,
        required:false,
        default:''
    },

    instagram:{
        type:String,
        required:false,
        default:''
    },
    facebook:{
        type:String,
        required:false,
        default:''
    },
    vk:{
        type:String,
        required:false,
        default:''
    },
    telegram:{
        type:String,
        required:false,
        default:''
    }
   
})



module.exports = mongoose.model('Organization', organizationSchema)