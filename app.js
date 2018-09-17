// initial setting
require('./models/Idea');
const express    = require('express');
const exphbs     = require('express-handlebars'); // UI library
const mongoose   = require ('mongoose'); // mongodb
const bodyParser = require('body-parser')
const app        = express();
const port       = 5000;

// MongoDB setting
mongoose.Promise = global.Promise; // Map global promise - get rid of warning
mongoose.connect('mongodb://localhost/vidjot-dev', { useNewUrlParser: true }) // Connect
.then(() => console.log('MongoDB Connected...')) // when success
.catch(err => console.log(err)); // when fail
const Idea = mongoose.model('ideas'); // Load Idea Model


// Handlebars Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//Endpoints
// Index
app.get('/', (req, res) => {
  const title = 'Welcome';
  res.render('index', { title: title });
});

// About
app.get('/about', (req, res) => {
  res.render('about');
})

// Add Idea Form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
})

// Process Form
app.post('/ideas', (req, res) => {
  let errors = [];

  // validate params
  if(!req.body.title) {
    errors.push({ text: 'Please add a title'});
  }
  if(!req.body.details) {
    errors.push({ text: 'Please add a details'});
  }

  if(errors.length > 0) {
    res.render('ideas/add', {
      errors:  errors,
      title:   req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title:   req.body.title,
      details: req.body.details
    }
    new Idea(newUser).save().then(idea => { res.redirect('/ideas'); })
  }
});
//Endpoints

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
