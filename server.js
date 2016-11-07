let express = require('express')
let app = express()
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let session = require('express-session')
let routes = require('./routes/index.route')

// Connexion a la BDD
mongoose.connect('mongodb://localhost/example')
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Connexion a la BDD établie')
})

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: 'aedn5154de45de',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  next()
});

// Routes
// mount all routes on /api path
app.use('/api', routes)

app.listen(8000)
