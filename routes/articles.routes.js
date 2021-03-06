const { Router } = require('express')
const Article = require("../models/Article")
const auth = require('../middleware/auth.middleware')
const { check, validationResult} = require("express-validator")
var fs = require('fs')
const multer = require('multer')
const config = require('config')


baseUrl = config.get('baseUrl')


let upload = multer({dest:`./client/build/images/articles`})

const router = Router()
let someId = ''


router.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find({}).sort({date:-1})
   return res.json(articles)
  } catch (e) {
   return res.status(500).json({ message: 'Перезагрузите страницу'})
  }
})

router.post('/articles-limit', async(req,res)=>{
  try {
    const limit = req.body.limit
    const articles = await Article.find({}).sort({date:-1}).limit(limit)
   return res.json(articles)
  } catch (e) {
   return res.status(500).json({ message: 'Что-то пошло не так, перезагрузите страницу' })
  }
})

router.get('/:id', async (req, res) => {
 
  try {
    console.log(req.params.id)
    if (req.params.id){
      const article = await Article.findById(req.params.id)
     return res.json(article)
    }
   return res.json({})
  
  
  } catch (e) {
   return res.status(500).json({ message: `Что-то пошло не так,перезагрузите страницу` })
  }
})

router.post('/update/:id', async (req, res) => {
  try {
   
      const article = await Article.findById(req.params.id)
    if (article.img !== 'placeholder.jpg' && req.body.image!==false){
	fs.unlink(`client/build/images/articles/${article.img}`,(err)=>{
	if (err) return res.status(500).json({message:'С удалением что-то не так'})
	else console.log(`${article.img} deleted`)
})
}
    
    const {text,title,date} = req.body
    article.title = title
    article.markdown = text
    article.createdAt = date
    await article.save()
    someId = article._id
    return res.status(201).json({ message: 'Статья изменена' , 
   
})  
  } catch (e) {
  return  res.status(500).json({ message: `${e}` })
  }
})

router.post('/delete/:id', async (req, res) => {
  try {
    let article = await Article.findById(req.params.id)
    if (article.img !=='placeholder.jpg'){
      fs.unlink(`client/build/images/articles/${article.img}`, (err) => {
        if (err) console.log(err);    
        else console.log(`${article.img} deleted`);
      });
    }
  
     article = await Article.findByIdAndDelete(req.params.id)
    
   return res.status(201).json({ message: 'Статья удалена' , 
    
   
})
    
  } catch (e) {
   return res.status(500).json({ message: `Что-то пошло не так, перезагрузите страницу` })
  }
})


router.post('/create', 

  async (req, res) =>{
    try{
      
          
        const {text,title,date} = req.body
       
            if (!title) {
                return res.status(400).json({ message: 'Название не отправлено' })
            }
           
            if (!text) {
                return res.status(400).json({ message: 'Текст не отправлен' })
            }
            const candidate = await Article.findOne({ title })
  
            if (candidate) {
                 return res.status(400).json({ message: 'Такая статья уже существует' })
            }
            
            const article = new Article()

            article.title = title
            article.markdown = text
            if (date!==''){
              article.createdAt = date
            }
            
            

            await article.save()
            someId = article._id
            

            res.status(201).json({ message: 'Статья создана' , 
            title:article.title,
            text:article.markdown,
            date:article.createdAt,
            id:article._id
        })
      }

      catch(e){
       return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })

      }
  } )

  router.post('/upload-img', upload.single("file"),async(req,res)=>{
    try{
     
      // const fileType =req.file.mimetype.split("/")[1]
      const fileName = req.file.originalname
      fs.rename(`client/build/images/articles/${req.file.filename}`,"client/build/images/articles/"+fileName,()=>{console.log('callback rename')})

      let candidate = await Article.findById(someId)
  
      if (!candidate) {
         return res.status(400).json({ message: 'Такая статья не существует' })
      }

      candidate.img = fileName
      await candidate.save()
      return res.status(201).json({message:'Изображение добавлено'})
    }catch(e){
     return res.status(500).json({ message: `Что-то пошло не так с загрузкой картинки` })
    }

  })



module.exports = router
