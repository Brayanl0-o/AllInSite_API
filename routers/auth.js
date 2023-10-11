const express = require('express')
const controllerAuth = require('../controllers/auth')
const router = express.Router()

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
    }); // validaciones para token en la aplicacion 

router.post('/signup',controllerAuth.signup) // ruta registro con validaciones 

router.post('/login',controllerAuth.login) // ruta inicio de sesión

router.get('/',controllerAuth.getsingup) //buscar todos los usuarios


module.exports = router