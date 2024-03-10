import express from 'express'
import { formLogin, formRegister, formForgetPassword } from '../controllers/usuario.controller.js' 

const router = express.Router()

router.get('/login', formLogin)
router.get('/register', formRegister)
router.get('/forget-password', formForgetPassword)

export default router