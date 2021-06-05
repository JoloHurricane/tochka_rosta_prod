const { Router } = require('express')
let fs = require('fs')
let path = require('path')
const multer = require('multer')
const config = require('config')
const documentCategory = require('../models/DocumentCategory')
const documentFile = require('../models/DocumentFile')




const router = Router()

let someId = ''
let categoryG = {}

let upload = multer({dest:`./client/build/documents`})


router.get('/documents-categories', async (req, res) => {
    try {
      const categories = await documentCategory.find({})
    return  res.json(categories)
    } catch (e) {
     return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова ' })
    }
  })
  
  router.get('/documents-categories/:id', async (req, res) => {
   
    try {
      
      if (req.params.id){
        const category = await documentCategory.findById(req.params.id)
       return res.json(category)
      }
     return res.json({})
    
    
    } catch (e) {
     return res.status(500).json({ message: `Что-то пошло не так` })
    }
  })

router.post('/update/:id', async (req, res) => {
    try {
      const category = await documentCategory.findById(req.params.id)
      const {title} = req.body
      fs.rename(`client/build/documents/${category.title}`,`client/build/documents/${title}`,()=>{console.log('callback rename')})
     
      category.title = title
      
      await category.save()
      someId = category._id
      res.status(201).json({ message: 'Категория изменена' , 
      title: category.title,

     
  })  
    } catch (e) {
     return res.status(500).json({ message: `Что-то пошло не так, перезагрузите страницу` })
    }
  })

router.post('/delete/:id', async (req, res) => {
    try {
      let category = await documentCategory.findById(req.params.id)
      const directory = `client/build/documents/${category.title}`

      fs.readdir(directory, (err, files) => {
      if (err) console.log(err)

      for (const file of files) {
          fs.unlink(path.join(directory, file), err => {
          if (err) console.log(err)
      })
    }
    fs.rmdir(`client/build/documents/${category.title}`,()=>(console.log('deleted')))
  })
     
      category = await documentCategory.findByIdAndDelete(req.params.id)
      
      
     return res.status(201).json({ message: 'Категория удалена' ,  
  })   
    } catch (e) {
     return res.status(500).json({ message: `Что-то пошло не так, перезагрузите страницу` })
    }
  })
  

router.post('/create', 
 
  async (req, res) =>{
    try{
      
        const {title} = req.body
       
            if (!title) {
                return res.status(400).json({ message: 'Название не отправлено' })
            }
            

            const candidate = await documentCategory.findOne({ title })
  
            if (candidate) {
                 return res.status(400).json({ message: 'Такая категория уже существует' })
            }
            
            const category = new documentCategory()

            category.title = title
            
            await category.save()
            fs.mkdir(`client/build/documents/${category.title}`,()=>{console.log('add folder')})
            someId = category._id
            

            res.status(201).json({ message: 'Категория создана' , 
            title:category.title,
            date:category.createdAt,
            id:category._id
        })
      }

      catch(e){
       return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова ' })

      }
  } )
  router.get('/files',async(req,res)=>{
    try {
   
      const files = await documentFile.find()
      return res.json(files)
    } catch (e) {
      return res.status(500).json({ message: `Что-то пошло не так, попробуйте снова ` })
    }
  })
  
  router.post('/files/:id',async(req,res)=>{
    try {
      console.log(req.params.catId)
      const files = await documentFile.find({category:req.body.catId})
      return res.json(files)
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова ' })
    }
  })
  router.post('/add-file-create', 
  
   async (req, res) =>{
     try{
          someId = req.body.id
          console.log(req.body.id)
          categoryG = await documentCategory.findById(req.body.id)
          
          return res.status(201).json({message:'add files'})
       }
 
       catch(e){
        return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова ' })
 
       }
   } )

  router.post('/add-file', upload.any(),async(req,res)=>{
    try{
     req.files.forEach(function(item,i,arr){
        const fileType =item.mimetype.split("/")[1]
        const fileName = item.originalname
      
        let document = new documentFile({category:someId,file:fileName})
        document.save()
        
        
        fs.rename(`client/build/documents/${req.files[i].filename}`,`client/build/documents/${categoryG.title}/`+fileName,()=>{console.log('callback rename')})
     })
      return res.status(201).json({message:'Все файлы добавлены'})

    }catch(e){
     return res.status(500).json({ message: `Что-то не так при добавлении файлов` })
    }

  })

  module.exports = router
