const express = require('express')
const controllerGame = require('../../controllers/videogames/game')
const router = express.Router()
const controllerUploadGame = require('../../controllers/videogames/uploadGame');
router.get('/filter', controllerGame.filterGames);
router.post('/create',controllerUploadGame.upload, controllerGame.create)
router.put('/update/:id', controllerUploadGame.upload, controllerGame.updateGame)
router.get('/', controllerGame.getGame)
router.get('/:id', controllerGame.getGameById)
router.delete('/delete/:id', controllerGame.deleteGame)


module.exports = router