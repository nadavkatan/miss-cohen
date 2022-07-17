const nodemailer = require('nodemailer'); 

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD
    }
});