const express = require('express')

const controllerGame = require('../controllers/game')

const router = express.Router()


router.post('/create', controllerGame.create)
router.patch('/update/:id', controllerGame.updateGame)
router.get('/', controllerGame.getGame)
router.get('/:id', controllerGame.getGameById)
// router.delete('/delete/:id', controllerGame.delete)

module.exports = router