const { Router } = require('express')
const Equipment = require('../models/Equipment')

const router = Router()

router.post('/create', async (req,res)=>{
  try{
    const {text} = req.body
    const equipment = new Equipment()
    equipment.text = text
   
   await equipment.save()
   return res.status(201).json({ message: 'Данные добавлены' , equipment:equipment
  })
  }catch(e){
    return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова ' })
  }
 
})

router.get('/equipment', async (req, res) => {
    try {
      const equipment = await Equipment.findOne()
     return res.json(equipment)
    } catch (e) {
     return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })


  router.post('/update', async (req, res) => {
    try {
      const equipment = await Equipment.findById(req.body._id)
      
    
      equipment.text = req.body.text
  

      await equipment.save()
     
      res.status(201).json({ message: 'Данные изменены' , 
      text:equipment.text})
    } 
      catch (e) {
    return  res.status(500).json({ message: `Что-то пошло не так , попробуйте снова` })
    }
  })

  module.exports = router