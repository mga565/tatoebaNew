const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  referrer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A referral must have a referrer'],
  },
  referredUser: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    default: null,
  },
  referralCode: {
    type: String,
    required: [true, 'A referral must have a code'],
    unique: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending',
  },
  referredAt: {
    type: Date,
    default: Date.now,
  },
  commissionEarned: {
    type: Number,
    default: 0,
  },
  commissionStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending',
  },
});

referralSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'referrer',
    select: 'name email',
  }).populate({
    path: 'referredUser',
    select: 'name email',
  });
  next();
});

const Referral = mongoose.model('Referral', referralSchema);

module.exports = Referral;
