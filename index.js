import express  from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import usuarioRoutes from './routes/usuario.routes.js'
import propertiesRoutes from './routes/propiedades.routes.js'
import db from './config/db.js'

//Crear la app
const app = express()

//Habilitar lectura de datos de formularios
app.use( express.urlencoded({ extended: true }) )

//Habilitar cookie parser
app.use( cookieParser() )

//Habilitar CSRF
app.use( csrf({cookie: true}) )

//Conexion a la base de datos
try {
    await db.authenticate();
    db.sync()
    console.log('Conexion correcta a la db')
} catch (error) {
    console.log(error)
}

//Habilitar Pug
app.set('view engine', 'pug')
app.set('views', './views')

//Carpeta publica
app.use( express.static('public') )

//Routing
app.use('/auth', usuarioRoutes)
app.use('/', propertiesRoutes)

//Definir puerto
const port = 3000

//Arrancar proyecto
app.listen( port, () => {
    console.log(`El servidor esta funcionando en: ${port}`)
})
