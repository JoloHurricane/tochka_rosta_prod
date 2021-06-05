const { Router } = require('express')
const Event = require('../models/Event')
const router = Router()

router.get('/events', async (req, res) => {
    try {
        const events = await Event.find({}).sort({date:-1})
      return  res.json(events)
      } catch (e) {
       return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова ' })
      }
    
 

})

router.get('/events/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
      return  res.json(event)
      } catch (e) {
       return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова ' })
      }
    
 

})


router.post('/create', async (req, res) => {
    try{
        if(req.body.title==false){
            return res.status(400).json({ message: 'Название не отправлено' })
        }
        const title = req.body.title
        const date = req.body.date
        const dateEnd = req.body.dateEnd
    
        const candidate = await Event.findOne({ title })
      
        if (candidate) {
             return res.status(400).json({ message: 'Такое событие уже существует' })
        }
    
        const event = new Event()
        event.title = title
        if (date!==''){
            event.createdAt=date
        }
        if(dateEnd!==''){
            event.createdEnd=dateEnd 
          }
    
      await event.save()
      res.status(201).json({ message: 'Событие создано' ,_id:event._id, createdAt:event.createdAt, createdEnd:event.createdEnd })
    }catch(e){
        return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова ' })
    }
   
})

router.post('/delete/:id', async (req, res) => {
   
    try{
        const event = await Event.findByIdAndDelete(req.params.id)
        res.status(201).json({ message: 'Событие удалено' , })
    }catch(e){
        return res.status(500).json({ message: 'Что-то пошло не так, перезагрузите страницу' })
    }
  

  
})

router.post('/update/:id', async (req, res) => {
    
    try{
        const event = await Event.findById(req.params.id)
        event.title =  req.body.title
        event.createdAt=req.body.createdAt
        event.createdEnd=req.body.createdEnd
    
      await event.save()
      res.status(201).json({ message: 'Данные изменены' , })
    }catch(e){
        return res.status(500).json({ message: 'Что-то пошло не так, перезагрузите страницу' })
    }
   
    
  

  })

module.exports = router