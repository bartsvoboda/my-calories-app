const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  userId: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String,
    required: true 
  },
  duration: { 
    type: Number, 
    required: true 
  },
  kcalperhour: {
    type: Number,
    required: true
  }, 
  dateYear: {
    type: Number,
    required: true
  },
  dateMonth: {
    type: Number,
    required: true
  },
  dateDay: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;