
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

const formForgetPassword = ( req, res ) => {
    res.render('auth/forget-password', {
        pagina: 'Recupera tu acceso a bienes raices'
    })
}

export  {
    formLogin,
    formRegister,
    formForgetPassword
}