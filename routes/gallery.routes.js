const { Router } = require('express')
const { check, validationResult} = require("express-validator")
let fs = require('fs')
let path = require('path')
const multer = require('multer')
const config = require('config')
const galleryCategory = require('../models/GalleryCategory')
const galleryImg = require('../models/GalleryImg')




const router = Router()


let someId = ''
let categoryG = {}

let upload = multer({dest:`./client/build/images/galleryCategory`})
let uploadImg = multer({dest:`./client/build/images/upload`})

router.get('/gallery-categories', async (req, res) => {
    try {
      const categorys = await galleryCategory.find({}).sort({date:-1})
    return  res.json(categorys)
    } catch (e) {
     return res.status(500).json({ message: 'Перезагрузите страницу' })
    }
  })


  router.get('/gallery-category', async (req, res) => {
    try {
      const category = await galleryCategory.findOne({}).sort({date:-1})
      console.log(category)
    return  res.json(category)
    } catch (e) {
     return res.status(500).json({ message: 'Перезагрузите страницу' })
    }
  })
  
  router.get('/:id', async (req, res) => {
   
    try {
      
      if (req.params.id){
        const category = await galleryCategory.findById(req.params.id)
       return res.json(category)
      }
     return res.json({})
    
    
    } catch (e) {
     return res.status(500).json({ message: `Что-то пошло не так, перезагрузите страницу` })
    }
  })

router.post('/update/:id', async (req, res) => {
    try {
      const category = await galleryCategory.findById(req.params.id)
      const {description,title,date} = req.body
     
      if (category.img!=='placeholder.jpg' && req.body.image!==false){
	fs.unlink(`client/build/images/galleryCategory/${category.img}`,(err)=>{if (err) console.log(err)
	else console.log(`${category.img} deleted`)

})
}
      category.title = title
      category.description = description
      category.createdAt = date
      await category.save()
      someId = category._id
   return   res.status(201).json({ message: 'Категория изменена' , 
      title: category.title,
      text: category.description,
      date: category.createdAt,
     
  })
  
  
  
      
    } catch (e) {
     return res.status(500).json({ message: `Что-то пошло не так, перезагрузите страницу` })
    }
  })

router.post('/delete/:id', async (req, res) => {
    try {
      let category = await galleryCategory.findById(req.params.id)
      const directory = `client/build/images/galleryCategory/${category.title}`
      fs.unlink(`client/build/galleryCategory/${category.img}`, (err) => {
        if (err) console.log(err);    
        else console.log(`${category.img} deleted`);
      });
      fs.readdir(directory, (err, files) => {
      if (err) console.log(err) 

      for (const file of files) {
          fs.unlink(path.join(directory, file), err => {
          if (err) console.log(err)
      })
    }
      fs.rmdir(`client/build/images/galleryCategory/${category.title}`,()=>(console.log('deleted')))
  }) 
      category = await galleryCategory.findByIdAndDelete(req.params.id)
      
      return res.status(201).json({ message: 'Категория удалена' , 
  })
    } catch (e) {
     return res.status(500).json({ message:`Что-то пошло не так, перезагрузите страницу` })
    }
  })
  

router.post('/create', 
 
  async (req, res) =>{
    try{
        const {title,description} = req.body
            if (!title) {
                return res.status(400).json({ message: 'Название не отправлено' })
            }
            if (!description) {
                return res.status(400).json({ message: 'Описание не отправлено' })
            }
      
            const candidate = await galleryCategory.findOne({ title })
  
            if (candidate) {
                 return res.status(400).json({ message: 'Такая категория уже существует' })
            }
            
            const category = new galleryCategory()

            category.title = title
            category.description=description
            

            await category.save()
            fs.mkdir(`client/build/images/galleryCategory/${category.title}`,()=>{console.log('add folder')})
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

  router.post('/upload-img', upload.single("file"),async(req,res)=>{
    try{
      if (!req.file.originalname) {
        return res.status(400).json({message:"img dont exists"})
      }
      // const fileType =req.file.mimetype.split("/")[1]
      const fileName = req.file.originalname
      fs.rename(`client/build/images/galleryCategory/${req.file.filename}`,"client/build/images/galleryCategory/"+fileName,()=>{console.log('callback rename')})

      let candidate = await galleryCategory.findById(someId)
  
      if (!candidate) {
         return res.status(400).json({ message: 'Такая категория не существует' })
      }

      candidate.img = fileName
      await candidate.save()
      return res.status(201).json({message:'Изображение добавлено'})
    }catch(e){
      return res.status(500).json({ message: `Что-то пошло не так при добавлении изображения` })
    }

  })


  router.post('/images',async(req,res)=>{
    try {
      const images = await galleryImg.find({category:req.body.catId})
      return res.json(images)
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

  router.post('/images-limit',async(req,res)=>{
    try {
      const limit = req.body.limit
      const images = await galleryImg.find({category:req.body.catId}).limit(limit)
      return res.json(images)
    } catch (e) {
      return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

  router.post('/add-img-create', 
  
   async (req, res) =>{
     try{
          someId = req.body.id
          console.log(req.body.id)
          categoryG = await galleryCategory.findById(req.body.id)
          
          return res.status(201).json({message:'Изображения добавлены'})
       }
 
       catch(e){
        return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
 
       }
   } )

  router.post('/add-img', uploadImg.any(),async(req,res)=>{
    try{
     req.files.forEach(function(item,i,arr){
        // const fileType =item.mimetype.split("/")[1]
        const fileName = item.originalname
      
        let galleryimg = new galleryImg({category:someId,img:fileName})
        galleryimg.save()
        
        
        fs.rename(`client/build/images/upload/${req.files[i].filename}`,`client/build/images/galleryCategory/${categoryG.title}/`+fileName,()=>{console.log('callback rename')})
     })
      return res.status(201).json({message:'Все изображения добавлены'})

    }catch(e){
     return res.status(500).json({ message: `Что-то пошло не так при загрузке изображений ` })
    }

  })

  module.exports = router
