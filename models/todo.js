let mongoose = require('mongoose')
let Schema = mongoose.Schema;

var todoSchema = new Schema({
  name: String,
  completed: {type: Boolean, default: false}
})

var Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
