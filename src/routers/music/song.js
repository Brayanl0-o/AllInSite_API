const express = require('express')
const controllerSong = require('../../controllers/music/song')
const router = express.Router()
const validateRoles = require('../../middlewares/verifyRole')
const authJwt = require('../../middlewares/authJwt')

//  Router for user creation (currently is not in use)
router.post('/create', controllerSong.create)

//  Routers for getting users and user by Id
router.get('/', controllerSong.getSongs)
router.get('/:id',controllerSong.getSongById)

//  Routers for updating user's info, one router for updating user info and another for user Img
router.patch('/update/:id',  controllerSong.updateSong)
// router.patch('/updateImg/:id', authJwt.verifyToken, controllerUploadUser.upload, controllerUploadUser.uploadFile, controllerUser.updateUser)

//  Router for deleting a user (currently is not in use)
router.delete('/delete/:id', controllerSong.deleteSong)

module.exports = router;