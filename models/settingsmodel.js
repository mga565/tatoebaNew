const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  settingName: {
    type: String,
    required: [true, 'A setting must have a name'],
    unique: true,
    trim: true,
  },
  settingValue: {
    type: mongoose.Schema.Types.Mixed, // Can be any type
    required: [true, 'A setting must have a value'],
  },
  description: String,
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Setting = mongoose.model('Setting', settingsSchema);

module.exports = Setting;
