const { Router } = require('express')
const About = require('../models/About')

const router = Router()

router.post('/create', async (req,res)=>{
  try{
    const {text} = req.body
    const about = new About()
    about.text = text
   
   await about.save()
   return res.status(201).json({ message: 'Данные добавлены' , about:about
  })
  }catch(e){
    return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова ' })
  }
 
})

router.get('/about', async (req, res) => {
    try {
      const about = await About.findOne()
     return res.json(about)
    } catch (e) {
     return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })


  router.post('/update', async (req, res) => {
    try {
      const about = await About.findById(req.body._id)
      
    
      about.text = req.body.text
  

      await about.save()
     
      res.status(201).json({ message: 'Данные изменены' , 
      text:about.text})
    } 
      catch (e) {
    return  res.status(500).json({ message: `Что-то пошло не так , попробуйте снова` })
    }
  })

  module.exports = router