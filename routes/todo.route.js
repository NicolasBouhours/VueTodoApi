let express = require('express')
let TodoController = require('../controllers/TodoController')

const router = express.Router()

router.route('/')
  .get(TodoController.list)
  .post(TodoController.create)

  router.route('/:id')
  .put(TodoController.update)
  .delete(TodoController.remove)

module.exports = router
