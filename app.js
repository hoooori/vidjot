// initial setting
require('./models/Idea');
const express  = require('express');
const exphbs   = require('express-handlebars'); // UI library
const mongoose = require ('mongoose'); // mongodb
const app      = express();
const port     = 5000;

// MongoDB setting
mongoose.Promise = global.Promise; // Map global promise - get rid of warning
mongoose.connect('mongodb://localhost/vidjot-dev', { useNewUrlParser: true }) // Connect
.then(() => console.log('MongoDB Connected...')) // when success
.catch(err => console.log(err)); // when fail
const Idea = mongoose.model('ideas'); // Load Idea Model


// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


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

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
