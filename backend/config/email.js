const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,                  
    secure: false,
    auth: {
        user: 'vini.akira.pinto@gmail.com',
        pass: 'kqyc mdiy iyai quqb'
    }
});

module.exports = transporter;