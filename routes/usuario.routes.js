import express from 'express'
import { formLogin, formRegister, formForgetPassword, register } from '../controllers/usuario.controller.js' 

const router = express.Router()

router.get('/login', formLogin)

router.get('/register', formRegister)
router.post('/register', register)

router.get('/forget-password', formForgetPassword)

export default router