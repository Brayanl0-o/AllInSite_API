const express = require('express')
const controllerUser = require('../../controllers/users/user')
const router = express.Router()
const controllerUploadUser = require('../../controllers/users/uploadUser');
const validateRoles = require('../../middlewares/verifyRole')
const authJwt = require('../../middlewares/authJwt')

//  Router for user creation (currently is not in use)
router.post('/create', controllerUser.create)

//  Routers for getting users and user by Id
router.get('/', authJwt.verifyToken, validateRoles, controllerUser.getUser)
router.get('/:id', authJwt.verifyToken, controllerUser.getUserById)

//  Routers for updating user's info, one router for updating user info and another for user Img
router.patch('/update/:id', authJwt.verifyToken, controllerUser.updateUser)
router.patch('/updateImg/:id', authJwt.verifyToken, controllerUploadUser.upload, controllerUploadUser.uploadFile, controllerUser.updateUser)

//  Router for deleting a user (currently is not in use)
router.delete('/delete/:id', authJwt.verifyToken, validateRoles, controllerUser.deleteUser)

module.exports = router