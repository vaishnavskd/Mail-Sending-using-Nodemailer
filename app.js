const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config()
const PORT = process.env.PORT
const app = express();


app.use(bodyParser.json());


app.post('/send-email', (req, res) => {
    const { senderEmail, password, friendEmail, message } = req.body;


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: senderEmail,
            pass: password
        }
    });
    // Mail Details
    const mailOptions = {
        from: senderEmail,
        to: friendEmail,
        subject: 'Test Email',
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Error sending email' });
        }
        console.log('Email sent:', info.response);

        res.json({ message: 'Email sent successfully' });
    });

});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
