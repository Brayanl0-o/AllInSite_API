const express = require('express')
const controllerGame = require('../../controllers/videogames/game')
const router = express.Router()
const controllerUploadGame = require('../../controllers/videogames/uploadGame');
const validateRoles = require('../../middlewares/verifyRole')
const authJwt = require('../../middlewares/authJwt')


router.get('/filter', controllerGame.filterGames);
router.post('/create',authJwt.verifyToken, validateRoles, controllerUploadGame.upload, controllerUploadGame.uploadFile, controllerGame.create)
router.patch('/update/:id', authJwt.verifyToken, validateRoles, controllerGame.updateGame)
router.patch('/updatedGameImg/:id', authJwt.verifyToken, validateRoles,controllerUploadGame.upload, controllerUploadGame.uploadFile,controllerGame.updateGame )
router.get('/', controllerGame.getGame)
router.get('/:id', controllerGame.getGameById)
router.delete('/delete/:id',  authJwt.verifyToken,validateRoles, controllerGame.deleteGame)


module.exports = router