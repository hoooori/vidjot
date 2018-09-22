// ******** initial setting ******** //
const express        = require('express');
const exphbs         = require('express-handlebars'); // UI library
const mongoose       = require('mongoose'); // mongodb
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
const flash          = require('connect-flash');
const session        = require('express-session');
const app            = express();
const port           = 5000;
// routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');
// ******** initial setting ******** //



// ******** MongoDB Setting ******** //
mongoose.Promise = global.Promise; // Map global promise - get rid of warning
mongoose.connect('mongodb://localhost/vidjot-dev', { useNewUrlParser: true }) // Connect
.then(() => console.log('MongoDB Connected...')) // when success
.catch(err => console.log(err)); // when fail
// ******** MongoDB Setting ******** //



// *********** Middleware ************ //
// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Method override
app.use(methodOverride('_method'));

// express session
app.use(session({
  secret:            'secret',
  resave:            true,
  saveUninitialized: true,
}))

//flash & Global variables
app.use(flash());
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg   = req.flash('error_msg');
  res.locals.error       = req.flash('error');
  next();
})
// *********** Middleware ************ //



// *********** Endpoints ************* //
// Index
app.get('/', (req, res) => {
  const title = 'Welcome';
  res.render('index', { title: title });
});

// About
app.get('/about', (req, res) => {
  res.render('about');
})
// *********** Endpoints ************* //



// *********** Load Routes ************* //
app.use('/ideas', ideas);
app.use('/users', users);
// *********** Load Routes ************* //



// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
