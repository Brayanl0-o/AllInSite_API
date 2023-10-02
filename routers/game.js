const express = require('express')

const controllerGame = require('../controllers/game')

const router = express.Router()


router.post('/create', controllerGame.create)
// router.put('/update/:id', controllerGame.update)
router.get('/', controllerGame.getGame)
router.get('/:id', controllerGame.getGameById)
// router.delete('/delete/:id', controllerGame.delete)

module.exports = router