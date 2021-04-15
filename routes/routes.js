const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());

app.use(cors());


// Middleware
const middleware = require('../middleware/validatingApi');

// Controller
const ppControllers = require('../controllers/ppCtrl');

// Sample API testing
app.get('/', (req, res) => {
  res.send({
     status:200,
     message:'App is working fine!'
  });
});

// Get Getir Information
app.post('/getir', [], (req, res, next) => {
  ppControllers.getAllInformation(req, res);
});


// Fetch Single Getir
app.get('/:id', [], (req, res, next) => {
  ppControllers.fetchOne(req, res);
});


module.exports = app;