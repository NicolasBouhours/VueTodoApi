let express             = require('express')
let app                 = express()
let helmet              = require('helmet')
let mongoose            = require('mongoose')
let morgan              = require('morgan')
let bodyParser          = require('body-parser')
let session             = require('express-session')
let expressValidator    = require('express-validator')
let routes              = require('./routes/index.route')
let authRoutes          = require('./routes/auth.route')
const config            = require('./config/config')

// Connexion a la BDD
mongoose.connect(config.database)
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Connexion a la BDD établie')
})
let port = process.env.PORT || 8000;

// Configuration
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(expressValidator())
app.set('superSecret', config.secret); // secret variable
app.use(session({secret: 'aedn5154de45de',resave: false,saveUninitialized: true,cookie: { secure: false }}))
app.use(morgan('dev'));

// dev configuration for allow vuejs to hit api
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  next()
});

// Routes
app.use('/auth', authRoutes)
app.use('/api', routes)

app.listen(port)
console.log('Server started on port : ' + port)
