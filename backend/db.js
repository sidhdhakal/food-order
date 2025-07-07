const mongoose = require('mongoose');
const db = mongoose.connection;

const connectmongo = () => {
     mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    db.on('connected', () => {
        console.log("Connected to MongoDB Database");
    });

    db.on('error', (err) => {
        console.error(`MongoDB connection error: ${err}`);
    });
}

module.exports = connectmongo;