const express = require('express')
const router = express.Router()
const authJwt = require('../../middlewares/authJwt')
const validateRoles = require('../../middlewares/verifyRole')
const controllerSong = require('../../controllers/music/song')
const controllerUploadImage = require('../../controllers/music/uploadImageMusic')
const controllerUploadTrack = require('../../controllers/music/uploadTrack')
//  Router for user creation (currently is not in use)
router.post('/create', authJwt.verifyToken, validateRoles, controllerSong.create)

//  Routers for getting users and user by Id
router.get('/', controllerSong.getSongs)
router.get('/:id',controllerSong.getSongById)

//  Routers for updating user's info, one router for updating user info and another for user Img
router.patch('/update/:id', authJwt.verifyToken, validateRoles,controllerSong.updateSong)
router.patch('/updateImg/:id', authJwt.verifyToken, validateRoles, controllerUploadImage.upload, controllerUploadImage.uploadFile, controllerSong.updateSong)

//  Router for deleting a user (currently is not in use)
router.delete('/delete/:id', authJwt.verifyToken, validateRoles, controllerSong.deleteSong)


router.get('/tracks/:trackID', controllerUploadTrack.getTrack);
router.post('/createTrack', controllerUploadTrack.uploadTrack);



module.exports = router;