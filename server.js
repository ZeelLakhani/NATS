const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configure the email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service (e.g., Gmail)
    auth: {
        user: 'lakhanizeel204@gmail.com', // Your email
        pass: 'cvxn xczh ilcn iyag' // Your email password or app password
    }
});

// Endpoint to send email
app.post('/send-email', (req, res) => {
    const { parentEmail, studentName, count } = req.body;

    const mailOptions = {
        from: 'lakhanizeel204@gmail.com',
        to: parentEmail,
        subject: `Attendance Alert for ${studentName}`,
        text: `Dear Parent,\n\nThis is to inform you that your child ${studentName} was absent for ${count} lecture(s) today.\n\nBest regards,\nYour School`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});