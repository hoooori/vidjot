// initial setting
require('./models/Idea');
const express        = require('express');
const exphbs         = require('express-handlebars'); // UI library
const mongoose       = require('mongoose'); // mongodb
const bodyParser     = require('body-parser')
const methodOverride = require('method-override')
const app            = express();
const port           = 5000;

// MongoDB setting
mongoose.Promise = global.Promise; // Map global promise - get rid of warning
mongoose.connect('mongodb://localhost/vidjot-dev', { useNewUrlParser: true }) // Connect
.then(() => console.log('MongoDB Connected...')) // when success
.catch(err => console.log(err)); // when fail
const Idea = mongoose.model('ideas'); // Load Idea Model

// Middleware
// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Method override
app.use(methodOverride('_method'));
// Middleware


// *********************************** //
// *********** Endpoints ************* //
// *********************************** //

// Index
app.get('/', (req, res) => {
  const title = 'Welcome';
  res.render('index', { title: title });
});

// About
app.get('/about', (req, res) => {
  res.render('about');
})

// *********** Idea ************* //
//Index
app.get('/ideas', (req, res) => {
  Idea.find({}).sort({ date: 'desc' }).then(ideas => {
    res.render('ideas/index', { ideas: ideas }); //後にviewでideasをfor文で表示
  });
});

// New
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});

// Edit
app.get('/ideas/edit/:id', (req, res) => {
  Idea.findOne({ _id: req.params.id }).then(idea => {
    res.render('ideas/edit', { idea: idea });
  });
});

// Create
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
      errors:  errors, //後にviewでideasをfor文で表示
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

// Update
app.put('/ideas/:id', (req, res) => {
  Idea.findOne({ _id: req.params.id }).then(idea => {
    //update values
    idea.title   = req.body.title,
    idea.details = req.body.details
    idea.save().then(idea => { res.redirect('/ideas'); })
  });
});

// Delete
app.delete('/ideas/:id', (req, res) => {
  Idea.remove({ _id: req.params.id }).then(() => {
    res.redirect('/ideas');
  });
});
// *********** Idea ************* //

// *********************************** //
// *********** Endpoints ************* //
// *********************************** //

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
