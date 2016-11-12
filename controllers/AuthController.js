let User = require('../models/user')
let jwt = require('jsonwebtoken');
const config = require('../config/config')

function list (req, res, next) {
  let users = User.find({}, (err, users) => {
    res.json(users);
  })
}

function create (req, res, next) {
  let nick = new User({
    name: 'Nick Cermina',
    password: 'password',
    admin: true
  })

  nick.save((err) => {
    if (err) throw err

    console.log('User saved successfully')
    res.json({success: true})
  })
}

function login (req, res, next) {
  User.findOne({name: req.body.name}, (err, user) => {
    if (err) throw err
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (user.password !== req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        console.log('create token')
        let token = jwt.sign(user, config.secret, {
          expiresIn: '24h' }
        )

        console.log('token created')

        res.json({
          success: true,
          message: 'Enjoy your token niggah',
          token: token
        })
      }
    }
  })
}

module.exports = {
  list,
  create,
  login
}
