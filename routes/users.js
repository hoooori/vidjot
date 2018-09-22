const express  = require('express');
const mongoose = require('mongoose');
const router   = express.Router();
module.exports = router;

// Login
router.get('/login', (req, res) => {
  res.send('login');
});

// Sign Up
router.get('/register', (req, res) => {
  res.send('register');
});
