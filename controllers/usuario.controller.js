import { check, validationResult } from 'express-validator'
import Usuario from '../models/Usuario.js'

const formLogin = ( req, res ) => {
    res.render('auth/login', {
        pagina: 'Iniciar sesión'
    })
}

const formRegister = ( req, res ) => {
    res.render('auth/register', {
        pagina: 'Crear cuenta'
    })
}

const register = async ( req, res ) => {
    //Validation
    await check( 'nombre' ).notEmpty().withMessage( 'Nombre obligatorio' ).run( req )
    await check( 'email' ).isEmail().withMessage( 'No es un email' ).run( req )
    await check( 'password' ).isLength({min: 6}).withMessage( 'El password debe ser de 6 caracteres' ).run( req )
    await check( 'repetir_password' ).equals( 'password' ).withMessage( 'Los passwords no son iguales' ).run( req )

    let result = validationResult( req )

    //Verified result
    if ( !result.isEmpty() ) {
        return res.render('auth/register', {
            pagina: 'Crear cuenta',
            errores: result.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    res.json( result.array() )

    const usuario = await Usuario.create( req.body )

    res.json(usuario)

}

const formForgetPassword = ( req, res ) => {
    res.render('auth/forget-password', {
        pagina: 'Recupera tu acceso a bienes raices'
    })
}

export  {
    formLogin,
    formRegister,
    formForgetPassword,
    register
}