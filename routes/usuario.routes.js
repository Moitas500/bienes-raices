import express from 'express'
import { formularioLogin } from '../controllers/usuario.controller.js' 

const router = express.Router()

router.get('/login', formularioLogin)

export default router