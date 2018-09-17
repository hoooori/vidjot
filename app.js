// initial setting
const express = require('express');
const exphbs  = require('express-handlebars'); //UI library
const app     = express();
const port    = 5000;

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


//Endpoint
// Index
app.get('/', (req, res) => {
  const title = 'Welcome';
  res.render('index', { title: title });
});

// About
app.get('/about', (req, res) => {
  res.render('about');
})
//Endpoint

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
