const { Router } = require('express')
const Organization = require('../models/Organization')

const router = Router()

router.post('/create', async (req,res)=>{
  try{
    const {title,phone,address,email,city} = req.body
    const organization = new Organization()
    organization.title = title
    organization.phone = phone
    organization.address = address
    organization.email = email
    organization.city = city
    organization.vk = req.body.vk
    organization.instagram = req.body.instagram
    organization.facebook = req.body.facebook
    organization.telegram = req.body.telegram
   await organization.save()
   return res.status(201).json({ message: 'Орг создана' , organization:organization
  })
  }catch(e){
    return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова ' })
  }
 
})

router.post('/organization', async (req, res) => {
    try {
      const organization = await Organization.findOne()
     return res.json(organization)
    } catch (e) {
     return res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })


  router.post('/update', async (req, res) => {
    try {
      console.log(req.body.title)
      const organization = await Organization.findById(req.body._id)
      console.log(organization)
    
      organization.title = req.body.title
      organization.address = req.body.address
      organization.email = req.body.email
      organization.phone = req.body.phone
      organization.phoneAdditional = req.body.phoneAdditional
      organization.city = req.body.city
      organization.vk = req.body.vk
      organization.instagram = req.body.instagram
      organization.facebook = req.body.facebook
      organization.telegram = req.body.telegram
      organization.map = req.body.map


      await organization.save()
     
      res.status(201).json({ message: 'Данные изменены' , 
      })
    } 
      catch (e) {
    return  res.status(500).json({ message: `${e}` })
    }
  })

  module.exports = router