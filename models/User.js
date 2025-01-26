const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required:false
    },
    password: {
        type: String,
        required:false
    },
    role:{
        type:String,
        required:false
    },
    isActive:{
        type:Boolean
    }
});

userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
  });

const User = mongoose.model('User', userSchema);
module.exports = User;