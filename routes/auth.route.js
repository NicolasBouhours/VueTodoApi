let express = require('express')
let User = require('../models/user')
let jwt = require('jsonwebtoken');
const config = require('../config/config')

const router = express.Router()

router.get('/setup', (req, res) => {
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
})

router.post('/authenticate', (req, res) => {
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
})

router.get('/users', (req, res) => {
  let users = User.find({}, (err, users) => {
    res.json(users);
  })
})

module.exports = router
