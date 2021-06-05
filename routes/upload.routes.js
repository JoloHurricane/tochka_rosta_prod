const { Router } = require('express')
var fs = require('fs')
const multer = require('multer')
const config = require('config')



baseUrl = config.get('baseUrl')


let upload = multer({dest:`./client/build/uploads`})

const router = Router()

router.post('/', upload.any(),async(req,res)=>{
    try{
  
     req.files.forEach(function(item,i,arr){
        const fileType =item.mimetype.split("/")[1]
        const fileName = item.originalname
        fs.rename(`client/build/uploads/${req.files[i].filename}`,"client/build/uploads/"+fileName,()=>{console.log('callback rename')})

     })
     return res.status(201).json({message:'Все файлы добавлены'})

    }catch(e){
      res.status(500).json({ message: `Что-то пошло не так` })
    }

  })



module.exports = router


