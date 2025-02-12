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
  image: {
    type: String,
    required: false,
  },
  sizes: [{
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  }],
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
    default:0,
    min: 0,
    max: 5,
  },
  raters:{
    type:Number,
    required:false,
    default:0
  },
  available: {
    type: Boolean,
    default: true,
  },
  veg:{
    type:Boolean,
    required:false
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
