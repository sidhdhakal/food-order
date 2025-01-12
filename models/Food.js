
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive number'],
  },
  category: {
    type: String,
    // enum: ['breakfast', 'lunch', 'dinner', 'snacks', 'beverages'],
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

foodSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
