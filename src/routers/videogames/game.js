const express = require('express')
const controllerGame = require('../../controllers/videogames/game')
const router = express.Router()
const uploadImageVideogame = require('../../controllers/videogames/uploadImageVideogame')
const validateRoles = require('../../middlewares/verifyRole')
const authJwt = require('../../middlewares/authJwt');
const urlFix = require('../../middlewares/trailerGame');

// Router to filter games
router.get('/filter', controllerGame.filterGames);

//  Router for game creation (currently is not in use)
router.post('/create',authJwt.verifyToken, validateRoles, uploadImageVideogame.upload, uploadImageVideogame.uploadFile, urlFix, controllerGame.create)
router.post('/createRequirements',controllerGame.createOrUpdateRequirementes)

// Router for updating game data, one for updating 
router.patch('/update/:id', authJwt.verifyToken, validateRoles, urlFix, controllerGame.updateGame)
router.patch('/updatedGameImg/:id', authJwt.verifyToken, validateRoles, uploadImageVideogame.upload, uploadImageVideogame.uploadFile,controllerGame.updateGame )
// router.patch('/updatedGameImg/:id', authJwt.verifyToken, validateRoles,controllerUploadGame.upload, controllerUploadGame.uploadFile,controllerGame.updateGame )

// Router for getting all games and game data by Id
router.get('/', controllerGame.getGame)
router.get('/gameRequirementsById/:id', controllerGame.getGameRequirementsById)

router.get('/:id', controllerGame.getGameById)

// Router for deleting game data
router.delete('/delete/:id',  authJwt.verifyToken,validateRoles, controllerGame.deleteGame)


module.exports = router