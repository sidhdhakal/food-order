const nodemailer = require('nodemailer');
require('dotenv').config();
// const { convert} = require('html-to-text'); // Import htmlToText properly


const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASSWORD
    },
});

const sendEmail = async options => {
    let html = null
    if (options.type === 'signup') {
        html = signupTemplate(options.userName, options.link);
    } else if (options.type === 'resetpassword') {
        html = passwordResetTemplate(options.userName, options.link);
    } else {
        throw new Error('Invalid email type');
    }


    const mailOptions = {
        from: {
            name: 'Babish',
            address: 'babish9887@gmail.com'
        },
        to:  [`${options.email}`],
        subject: options.subject,
        html: html
        // text: options.text
    }
    try{
        const response = await transporter.sendMail(mailOptions);
        console.log('Email sent Successfully')
        return response

    } catch (err){
        console.error('Error sending email:', err);
        return err
    }
}
module.exports = sendEmail;



const signupTemplate = (userName, link) => `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f9f9f9;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #FF5722; /* Orange */
                font-size: 24px;
            }
            p {
                font-size: 16px;
                line-height: 1.5;
            }
            a {
                color: #FF5722; /* Orange */
                text-decoration: none;
                font-weight: bold;
            }
            .link-container {
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Welcome to Foodmate, ${userName}!</h1>
            <p>We are excited to have you with us. To get started, please verify your email address by clicking the link below:</p>
            <div class="link-container">
                <a href="${link}" target="_blank">Click here to verify your email</a>
            </div>
            <p>If you have trouble clicking the link, copy and paste the following URL into your browser:</p>
            <p><a href="${link}" target="_blank">${link}</a></p>
        </div>
    </body>
    </html>
`;

const passwordResetTemplate = (userName, link) => `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f9f9f9;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #FF5722; /* Orange */
                font-size: 24px;
            }
            p {
                font-size: 16px;
                line-height: 1.5;
            }
            a {
                color: #FF5722; /* Orange */
                text-decoration: none;
                font-weight: bold;
            }
            .link-container {
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Password Reset Request for ${userName}</h1>
            <p>We received a request to reset your password. To proceed, please click the link below:</p>
            <div class="link-container">
                <a href="${link}" target="_blank">Click here to reset your password</a>
            </div>
            <p>If you did not request a password reset, please ignore this email. If you have trouble clicking the link, copy and paste the following URL into your browser:</p>
            <p><a href="${link}" target="_blank">${link}</a></p>
        </div>
    </body>
    </html>
`;
