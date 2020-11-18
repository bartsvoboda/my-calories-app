const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  age: {
    type: Number,
    required:true
  },
  gender: {
    type: CharacterData,
    required: true
  },
  currentWeight: {
    type: Number,
    required: true
  },
  goalWeight: {
    type: Number,
    required: true
  },
  activity: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;