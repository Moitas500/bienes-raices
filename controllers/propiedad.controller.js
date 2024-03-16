
const admin = (req, res) => {
    res.render('propiedades/admin', {
        pagina: 'Mis propuedades',
        barra: true
    })
}

const crear = (req, res) => {
    res.render('propiedades/crear', {
        pagina: 'Crear propiedadd',
        barra: true
    })
}

export {
    admin,
    crear
}