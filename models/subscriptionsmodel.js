const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Subscription must belong to a user!'],
  },
  package: {
    type: mongoose.Schema.ObjectId,
    ref: 'Package',
    required: [true, 'Subscription must belong to a package!'],
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: Date,
  status: {
    type: String,
    enum: ['active', 'inactive', 'cancelled', 'expired'],
    default: 'active',
  },
  price: {
    type: Number,
    required: [true, 'Subscription must have a price!'],
  },
  paymentMethod: String,
  transactionId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

subscriptionSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email',
  }).populate({
    path: 'package',
    select: 'name price duration',
  });
  next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
