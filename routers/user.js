const express = require ('express')
const controllerUser = require ('../controllers/user')
const router = express.Router()

router.post('/create', controllerUser.create)
router.get('/', controllerUser.getUser)
router.get('/:id', controllerUser.getUserById)
router.patch('/update/:id', controllerUser.updateUser)
router.delete('/delete/:id', controllerUser.deleteUser)

module.exports = router