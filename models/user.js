// get an instance of mongoose and mongoose.Schema
let mongoose = require('mongoose');
let bcrypt = require('bcrypt')
let salt = bcrypt.genSaltSync(10);
let Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
let userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    phone: String,
    address: String,
    city: String,
    zipCode: String
})


userSchema.pre('save', function(next) {
  let user = this;
  user.password = bcrypt.hashSync(user.password, salt)

  next();
});

module.exports = mongoose.model('User', userSchema);
