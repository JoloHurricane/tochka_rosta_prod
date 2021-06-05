const mongoose = require("mongoose")
const fullDateNow = require("../functions/dateFunc")
const createDomPrurify = require("dompurify")
const { JSDOM } = require("jsdom")
const marked = require('marked')

const domprurify = createDomPrurify(new JSDOM().window)
const date =  Date.now()
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

   
    markdown: {
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
    sanitizedHtml: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: 'placeholder.jpg',
    },
})

articleSchema.pre('validate', function (next) {
    if (this.markdown) {
        this.sanitizedHtml = domprurify.sanitize(marked(this.markdown)) 
    }
    next()
})

module.exports = mongoose.model('Article', articleSchema)