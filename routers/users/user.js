const express = require('express')
const controllerUser = require('../../controllers/users/user')
const router = express.Router()
const controllerUploadUser = require('../../controllers/users/uploadUser');

router.post('/create', controllerUser.create)
router.get('/', controllerUser.getUser)
router.get('/:id', controllerUser.getUserById)
router.patch('/update/:id',controllerUser.updateUser)
router.patch('/updateImg/:id',controllerUploadUser.upload, controllerUploadUser.uploadFile, controllerUser.updateUser)
router.delete('/delete/:id', controllerUser.deleteUser)

module.exports = router