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

router.post('/signup',controllerAuth.signup) 

router.post('/login',controllerAuth.login) 

router.get('/',controllerAuth.getsingup) //buscar todos los usuarios


module.exports = router