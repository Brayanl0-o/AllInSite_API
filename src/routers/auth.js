const express = require('express')
const router = express.Router()
const authJwt = require('../middlewares/authJwt')
const controllerUploadUser = require('../controllers/users/uploadImageUser');
const validateRoles = require('../middlewares/verifyRole')
const authMiddleware = require('../middlewares/authMiddleware');

const controllerAuth = require('../controllers/auth')

// Use response header to define data in headers
router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
    });
//  Router for user login with google
router.post('/signInWithGoogle', controllerAuth.signInWithGoogle)

// Router for user register
router.post('/signup', controllerUploadUser.upload, controllerUploadUser.uploadFile, controllerAuth.signup)

//  Router for user login
router.post('/login',controllerAuth.login)

//  Router for get all users
router.get('/', authJwt.verifyToken, validateRoles, controllerAuth.getsingup)

//  Router to send a password reset link to user
router.post("/send-password-link", controllerAuth.sendPasswordLink)

//  Router for change a user´s password 
router.post("/change-password", controllerAuth.changePassword)
module.exports = router