require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const connectmongo=require('./db')
// Create an Express app


const fs = require('fs')

// body parser configuration

connectmongo();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    express.urlencoded({
      extended: true,
    })
  )
  

// CORS configuration to allow localhost:5173
const corsOptions = {
    origin: ['http://localhost:5173','https://food-mate-v1.vercel.app/'], // Adjust as needed for production
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};

// Apply CORS and Helmet middleware
app.use(cors(corsOptions));
app.use(helmet());

// Middleware to parse JSON data
app.use(bodyParser.json());

// Route to handle storing user data
// app.post('/api/users', async (req, res) => {
//     const { email, name, picture } = req.body;

//     if (!email || !name) {
//         return res.status(400).json({ message: 'Email and name are required' });
//     }

//     try {
//         let user = await User.findOne({ email });

//         if (user) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         user = new User({ email, name, picture });

//         await user.save();

//         res.status(201).json({ message: 'User stored successfully' });
//     } catch (error) {
//         console.error(error);
//         if (error.name === 'MongoError' && error.code === 11000) {
//             return res.status(400).json({ message: 'Duplicate email address' });
//         }
//         res.status(500).json({ message: 'Server error' });
//     }
// });

app.use('/api/auth',require('./routes/auth'))
app.use('/api/food',require('./routes/food'))

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
