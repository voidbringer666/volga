// declare variables

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); //optional if I want to send email

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public')); //serve static files (css, js)

//Route to handle form submissions
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  //optional: send email using nodemailer, log it to console, 
  
})