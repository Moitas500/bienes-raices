import express from 'express'
import { formLogin, formRegister, formForgetPassword, register, resetPassword, authenticate } from '../controllers/usuario.controller.js' 

const router = express.Router()

router.get('/login', formLogin)
router.post('/login', authenticate)

router.get('/register', formRegister)
router.post('/register', register)

router.get('/forget-password', formForgetPassword)
router.post('/forget-password', resetPassword)

export default router