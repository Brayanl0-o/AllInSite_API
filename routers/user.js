const express = require('express')
const controllerUser = require('../controllers/user')
const router = express.Router()
const controllerUploadUser = require('../controllers/uploadUser');

router.post('/create', controllerUser.create)
router.get('/', controllerUser.getUser)
router.get('/:id', controllerUser.getUserById)
router.put('/update/:id',controllerUploadUser.upload, controllerUser.updateUser)
router.delete('/delete/:id', controllerUser.deleteUser)

module.exports = router