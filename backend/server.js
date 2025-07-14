// --- Imports ---
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectmongo = require('./db');

// --- Initialize App and Connect to DB ---
const app = express();
connectmongo();

// --- CORS Configuration ---
// Define the list of origins that are allowed to access your backend
const corsOptions = {
    origin: [
        'http://localhost:3000', // <--- IMPORTANT: Added your frontend's Docker origin
        'http://localhost:5173', // Your original local dev origin
        'https://food-mate-v1.vercel.app' // Your production origin
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// --- Middleware ---
// IMPORTANT: Middleware is executed in order. CORS must come before your routes.

// 1. Apply CORS middleware FIRST
app.use(cors(corsOptions));

// 2. Apply Helmet for security headers
app.use(helmet());

// 3. Use Express's built-in JSON and URL-encoded parsers.
//    (This replaces the old `body-parser` package and cleans up redundant lines).
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


// --- A simple test route to confirm the server is running ---
app.get('/', (req, res) => {
  res.send('Backend is running and configured correctly!');
});


// --- API Routes ---
// These must come AFTER the middleware has been set up.
app.use('/api/auth', require('./routes/auth'));
app.use('/api/food', require('./routes/food'));
app.use('/api/order', require('./routes/order'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/dashboard', require('./routes/dashboard'));


// --- Start Server ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
