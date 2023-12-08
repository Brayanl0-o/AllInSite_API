const express = require('express')
const controllerAuth = require('../controllers/auth')
const router = express.Router()
const authJwt = require('../middlewares/authJwt')
const controllerUploadUser = require('../controllers/users/uploadUser');

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
    }); // validaciones para token en la aplicacion 

router.post('/signup',controllerUploadUser.upload, controllerAuth.signup) 

router.post('/login',controllerAuth.login) 

router.get('/',controllerAuth.getsingup) //buscar todos los usuarios

router.post("/send-password-link", controllerAuth.sendPasswordLink)

router.post("/change-password", authJwt.verifyToken, controllerAuth.changePassword,)
module.exports = router