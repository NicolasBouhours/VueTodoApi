let Todo = require('../models/todo')

function list (req, res, next) {
  Todo.find({}, (err, todos) => {
    if (todos) {
      return res.send(todos)
    } else {
      return res.status(500).send({error: 'Impossible de charge les todo'})
    }
  })
}

function create (req, res, next) {
  if (req.body.name !== undefined && req.body.name !== '' ) {
    let todo = new Todo({name: req.body.name, completed: false})

    let promise = todo.save();
    promise.then((msg) => {
      return res.send({success: 'Todo enregistrées avec succès'})
    }, (err) => {
      return res.status(500).send({error: 'Impossible de créer la todo'})
    })
  } else {
    return res.status(500).send({error: 'Nom de la todo indéfini'})
  }
}

function update (req, res, next) {
  if (req.body.name !== undefined && req.params.id !== undefined && req.body.completed !== undefined) {
    Todo.findById(req.params.id, (err, todo) => {
      if (err) {
        return res.status(500).send({error: 'Impossible de récupèrer la todo'})
      } else if (todo) {
        todo.name = req.body.name
        todo.completed = req.body.completed

        if (req.body.newName !== undefined) {
          todo.name = req.body.newName
        }
        let promise = todo.save();
        promise.then((msg) => {
          return res.send({success: 'Todo mise a jour avec succès'})
        }, (err) => {
          return res.status(500).send({error: 'Impossible d\'update la todo'})
        })
      }
    })
  } else {
    return res.status(500).send({error: 'Informations incorrectes'})
  }
}

function remove (req, res, next) {
  if (req.params.id !== undefined) {
    Todo.findById(req.params.id, (err, todo) => {
      if (err) {
        return res.status(500).send({error: 'Impossible de récupèrer la todo'})
      } else if (todo) {
        let promise = todo.remove();
        promise.then((err) => {
          return res.status(500).send({error: 'Impossible de supprimer la todo'})
        })
        return res.send({error: 'Todo supprimée avec succès'})
      }
    })
  } else {
    return res.status(500).send({error: 'Informations incorrectes'})
  }
}

module.exports = {
  list,
  create,
  update,
  remove
}
