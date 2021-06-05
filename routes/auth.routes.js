const { Router } = require('express')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult} = require("express-validator")
const User = require('../models/User')
const expiresIn =require('expiresin')
const router = Router()


// /api/auth/register
router.post(
    '/register',
 
    async (req, res) => {
    try {
      
      
  
      const {login, password} = req.body
  
      const candidate = await User.findOne({ login })
  
      if (candidate) {
        return res.status(400).json({ message: 'Такой пользователь уже существует' })
      }
  
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ login, password: hashedPassword })
  
      await user.save()
  
      res.status(201).json({ message: 'Пользователь создан' })
  
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })
  
  // /api/auth/login
  router.post(
    '/login',
    [
      check('login', 'Введите корректный login').exists(),
      check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
    try {
      const errors = validationResult(req)
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при входе в систему'
        })
      }
  
      const {login, password} = req.body
  
      const user = await User.findOne({ login })
  
      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }
  
      const isMatch = await bcrypt.compare(password, user.password)
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
      }
  
      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn:60*60 }
      )
  
      res.json({ token, userId: user.id })
  
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })

  router.get(
    '/users',
    async (req, res) => {
    try {
      const users = await User.find({})
      return  res.json(users)

    
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, перезагрузите страницу' })
    }
  })


module.exports = router