const Subscription = require('../models/subscriptionsmodel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllSubscriptions = catchAsync(async (req, res, next) => {
  const subscriptions = await Subscription.find();

  res.status(200).json({
    status: 'success',
    results: subscriptions.length,
    data: {
      subscriptions,
    },
  });
});

exports.getSubscription = catchAsync(async (req, res, next) => {
  const subscription = await Subscription.findById(req.params.id);

  if (!subscription) {
    return next(new AppError('No subscription found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      subscription,
    },
  });
});

exports.createSubscription = catchAsync(async (req, res, next) => {
  const newSubscription = await Subscription.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      subscription: newSubscription,
    },
  });
});

exports.updateSubscription = catchAsync(async (req, res, next) => {
  const updatedSubscription = await Subscription.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedSubscription) {
    return next(new AppError('No subscription found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      subscription: updatedSubscription,
    },
  });
});

exports.deleteSubscription = catchAsync(async (req, res, next) => {
  const subscription = await Subscription.findByIdAndDelete(req.params.id);

  if (!subscription) {
    return next(new AppError('No subscription found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
