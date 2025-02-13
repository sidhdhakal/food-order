const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  orderId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  ratings: [
    {
      itemId: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
      }
    },
  ],
  feedback:{
    type:String,
    required:false
  },
  reply:{
    type:String,
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
})

feedbackSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
