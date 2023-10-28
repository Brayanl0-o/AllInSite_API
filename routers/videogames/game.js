const express = require('express')
const controllerGame = require('../../controllers/videogames/game')
const router = express.Router()

router.get('/filter', controllerGame.filterGames);
router.post('/create', controllerGame.create)
router.patch('/update/:id', controllerGame.updateGame)
router.get('/', controllerGame.getGame)
router.get('/:id', controllerGame.getGameById)
router.delete('/delete/:id', controllerGame.deleteGame)


module.exports = router