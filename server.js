require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;
const recipients = process.env.RECIPIENT_EMAILS.split(','); // Splits the emails into an array

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up nodemailer transporter (optional)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Route to handle form submissions
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Email options
  const mailOptions = {
    from: email,
    to: recipients, // use the array from .env
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send email (optional)
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log(`Email sent: ${info.response}`);
      res.send('Form submitted successfully!');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});