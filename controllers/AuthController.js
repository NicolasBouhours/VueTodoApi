let User = require('../models/user')
let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')
let salt = bcrypt.genSaltSync(10);
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
    res.json(errors, 400);
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

      console.log('User saved successfully')
      res.json({success: true})
    })
  }
}

function login (req, res, next) {
  User.findOne({name: req.body.name}, (err, user) => {
    if (err) throw err
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (user.password !== bcrypt.hashSync(req.body.password, salt)) {
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
