let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let todoSchema = new Schema({
  name: String,
  completed: {type: Boolean, default: false}
})

let Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
