import { check, validationResult } from 'express-validator'
import  jwt  from 'jsonwebtoken'
import { generateId, generateJWT } from '../helpers/tokens.js'
import Usuario from '../models/Usuario.js'

const formLogin = ( req, res ) => {
    res.render('auth/login', {
        pagina: 'Iniciar sesión',
        csrfToken: req.csrfToken()
    })
}

const formRegister = ( req, res ) => {
    res.render('auth/register', {
        pagina: 'Crear cuenta',
        csrfToken: req.csrfToken()
    })
}

const register = async ( req, res ) => {
    //Validation
    await check( 'nombre' ).notEmpty().withMessage( 'Nombre obligatorio' ).run( req )
    await check( 'email' ).isEmail().withMessage( 'No es un email' ).run( req )
    await check( 'password' ).isLength({min: 6}).withMessage( 'El password debe ser de 6 caracteres' ).run( req )

    let result = validationResult( req )

    //Verified result
    if ( !result.isEmpty() ) {
        return res.render('auth/register', {
            pagina: 'Crear cuenta',
            csrfToken: req.csrfToken(),
            errores: result.array(),
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    const usuarioExists = await Usuario.findOne({ where: { email: req.body.email } })

    if ( usuarioExists ) {
        return res.render('auth/register', {
            pagina: 'Crear cuenta',
            errores: [{msg: 'El usuario ya esta registrado'}],
            usuario: {
                nombre: req.body.nombre,
                email: req.body.email
            }
        })
    }

    await Usuario.create({
        nombre: req.body.nombre,
        email: req.body.email, 
        password: req.body.password,
        token: generateId()
    })

    res.render('templates/mensaje', {
        pagina: 'Cuenta creada correctamente',
        mensaje: 'Se ha enviado un email de confirmacion'
    })
}

const authenticate = async ( req, res ) => {
    //Validation
    await check( 'email' ).isEmail().withMessage( 'El email es obligatorio' ).run( req )
    await check( 'password' ).notEmpty().withMessage( 'El password es obligatorio' ).run( req )

    let result = validationResult( req )

    //Verified result
    if ( !result.isEmpty() ) {
        return res.render('auth/login', {
            pagina: 'Iniciar sesión',
            csrfToken: req.csrfToken(),
            errores: result.array(),
        })
    }

    const { email, password } = req.body

    const usuario = await Usuario.findOne({ where: { email }})

    if ( !usuario ) {
        return res.render('auth/login', {
            pagina: 'Iniciar sesión',
            csrfToken: req.csrfToken(),
            errores: [{ msg: 'El usuario no existe' }]
        })
    }

    if ( !usuario.verifiedPassword( password ) ) {
        return res.render('auth/login', {
            pagina: 'Iniciar sesión',
            csrfToken: req.csrfToken(),
            errores: [{ msg: 'El password es incorrecto' }]
        })
    }

    const token = generateJWT( usuario.id )

    return res.cookie('_token', token, {
        httpOnly: true,
        //secure: true
    }).redirect('/my-properties')
}

const formForgetPassword = ( req, res ) => {
    res.render('auth/forget-password', {
        pagina: 'Recupera tu acceso a bienes raices',
        csrfToken: req.csrfToken(),
    })
}

const resetPassword = async ( req, res ) => {
    //Validation
    await check( 'email' ).isEmail().withMessage( 'No es un email' ).run( req )

    let result = validationResult( req )

    //Verified result
    if ( !result.isEmpty() ) {
        return res.render('auth/forget-password', {
            pagina: 'Recupera tu acceso a bienes raices',
            csrfToken: req.csrfToken(),
            errores: result.array()
        })
    }

    //Search user

    const { email } = req.body

    const usuario = await Usuario.findOne({ where: { email } })

    if ( !usuario ) {
        return res.render('auth/forget-password', {
            pagina: 'Recupera tu acceso a bienes raices',
            csrfToken: req.csrfToken(),
            errores: [{msg: 'El email no pertenece a ningun usuario'}]
        })
    }

    usuario.token = generateId()
    await usuario.save()
}

export  {
    formLogin,
    formRegister,
    formForgetPassword,
    register,
    resetPassword,
    authenticate
}