require('../models/Idea');
const express  = require('express');
const mongoose = require('mongoose');
const router   = express.Router();
const Idea     = mongoose.model('ideas');
module.exports = router;

//Index
router.get('/', (req, res) => {
  Idea.find({}).sort({ date: 'desc' }).then(ideas => {
    res.render('ideas/index', { ideas: ideas }); //後にviewでideasをfor文で表示
  });
});

// New
router.get('/add', (req, res) => {
  res.render('ideas/add');
});

// Edit
router.get('/edit/:id', (req, res) => {
  Idea.findOne({ _id: req.params.id }).then(idea => {
    res.render('ideas/edit', { idea: idea });
  });
});

// Create
router.post('/', (req, res) => {
  let errors = [];

  // validate params
  if(!req.body.title) {
    errors.push({ text: 'Please add a title'});
  }
  if(!req.body.details) {
    errors.push({ text: 'Please add a details'});
  }

  if(errors.length > 0) {
    res.render('/add', {
      errors:  errors, //後にviewでideasをfor文で表示
      title:   req.body.title,
      details: req.body.details
    });
  } else {
    const newUser = {
      title:   req.body.title,
      details: req.body.details
    }
    new Idea(newUser).save().then(idea => {
      req.flash('success_msg', 'Video idea added');
      res.redirect('/ideas');
    })
  }
});

// Update
router.put('/:id', (req, res) => {
  Idea.findOne({ _id: req.params.id }).then(idea => {
    //update values
    idea.title   = req.body.title,
    idea.details = req.body.details
    idea.save().then(idea => {
      req.flash('success_msg', 'Video idea updated');
      res.redirect('/ideas');
    })
  });
});

// Delete
router.delete('/:id', (req, res) => {
  Idea.remove({ _id: req.params.id }).then(() => {
    req.flash('success_msg', 'Video idea removed');
    res.redirect('/ideas');
  });
});
