let express = require('express')
let jwt = require('jsonwebtoken');
const config = require('../config/config')

module.exports = (req, res, next) => {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  console.log('middleware test')

  if (token) {
    // verifies secret and checks exp
   jwt.verify(token, config.secret, (err, decoded) => {
     if (err) {
       return res.json({ success: false, message: 'Failed to authenticate token.' });
     } else {
       // if everything is good, save to request for use in other routes
       req.decoded = decoded;
       next();
     }
   });
 } else {
   // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
 }
}
