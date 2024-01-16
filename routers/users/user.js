const express = require('express')
const controllerUser = require('../../controllers/users/user')
const router = express.Router()
const controllerUploadUser = require('../../controllers/users/uploadUser');
const validateRoles = require('../../middlewares/verifyRole')
const authJwt = require('../../middlewares/authJwt')

router.post('/create', controllerUser.create)
router.get('/', authJwt.verifyToken, validateRoles, controllerUser.getUser)
router.get('/:id', authJwt.verifyToken, controllerUser.getUserById)
router.patch('/update/:id', authJwt.verifyToken, controllerUser.updateUser)
router.patch('/updateImg/:id', authJwt.verifyToken, controllerUploadUser.upload, controllerUploadUser.uploadFile, controllerUser.updateUser)
router.delete('/delete/:id', authJwt.verifyToken, validateRoles, controllerUser.deleteUser)

module.exports = router