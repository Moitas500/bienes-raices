import  express  from "express"
import { admin, crear } from '../controllers/propiedad.controller.js'

const router = express.Router()

router.get('/my-properties', admin)
router.get('/propiedades/crear', crear)

export default router