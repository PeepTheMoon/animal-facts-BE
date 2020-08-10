const mongoose = require('mongoose');

const animalFactSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  image: {
    type: String,
    required: true
  },

  caption: {
    type: String,
    required: true,
    maxlength: 516
  }

}, {
  toJSON: {
    // virtual: true,
    transform: (doc, ret) => {
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model('AnimalFact', animalFactSchema);
