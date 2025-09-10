const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A package must have a name'],
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'A package must have a price'],
  },
  duration: {
    type: String,
    required: [true, 'A package must have a duration (e.g., '1 month', '1 year')'],
  },
  features: [String], // Array of features included in the package
  maxDecks: { // Example feature
    type: Number,
    default: 50,
  },
  maxCardsPerDeck: {
    type: Number,
    default: 1000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
