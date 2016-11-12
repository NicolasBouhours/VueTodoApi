let express = require('express')
let todoRoutes = require('./todo.route')
let authRoutes = require('./auth.route')
let authMiddleware = require('../middlewares/auth.middleware')

const router = express.Router()

router.use(authMiddleware)
router.use('/todo', todoRoutes)

module.exports = router
