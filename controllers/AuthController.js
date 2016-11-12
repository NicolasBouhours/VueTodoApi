let User = require('../models/user')
let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')
let salt = bcrypt.genSaltSync(10)
const config = require('../config/config')

function list (req, res, next) {
  let users = User.find({}, (err, users) => {
    res.json(users);
  })
}

function create (req, res, next) {
  req.assert('firstName', 'firstname required').notEmpty();
  req.assert('lastName', 'Lastname required').notEmpty();
  req.assert('email', 'Email required').notEmpty().isEmail();
  req.assert('password', 'Mot de passe requis').notEmpty();

  const errors = req.validationErrors(true);

  if (errors) {
    res.json(errors, 400)
  } else {
    let usr = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address,
      city: req.body.city,
      zipCode: req.body.zipCode
    })

    usr.save((err) => {
      if (err) res.json({success: false})

      res.json({success: true})
    })
  }
}

function login (req, res, next) {

  req.assert('email', 'email required').notEmpty();
  req.assert('password', 'mot de passe required').notEmpty();

  const errors = req.validationErrors(true)

  if (errors) {
    res.json(errors, 400)
  } else {
    User.findOne({email: req.body.email}, (err, user) => {

      if (err) throw err
      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {

        bcrypt.compare(req.body.password, bcrypt.hashSync(req.body.password, salt), (err, result) => {
          if (!result) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {

            let token = jwt.sign(user._id, config.secret, {
              expiresIn: '6h'
            })

            res.json({
              success: true,
              message: 'Enjoy your token niggah',
              token: token
            })
          }
        })
      }
    })
  }
}

module.exports = {
  list,
  create,
  login
}
