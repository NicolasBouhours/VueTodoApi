let express = require('express')
let AuthController = require('../controllers/AuthController')

const router = express.Router()

router.route('/setup').post(AuthController.create)

router.route('/authenticate').post(AuthController.login)

router.route('/users').get(AuthController.list)

module.exports = router
