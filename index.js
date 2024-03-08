import express  from 'express'
import usuarioRoutes from './routes/usuario.routes.js'

//Crear la app
const app = express()

//Habilitar Pug
app.set('view engine', 'pug')
app.set('views', './views')

//Routing
app.use('/auth', usuarioRoutes)

//Definir puerto
const port = 3000

//Arrancar proyecto
app.listen( port, () => {
    console.log(`El servidor esta funcionando en: ${port}`)
})
