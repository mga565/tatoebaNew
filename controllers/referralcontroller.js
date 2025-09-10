const Referral = require('../models/referralmodel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllReferrals = catchAsync(async (req, res, next) => {
  const referrals = await Referral.find();

  res.status(200).json({
    status: 'success',
    results: referrals.length,
    data: {
      referrals,
    },
  });
});

exports.getReferral = catchAsync(async (req, res, next) => {
  const referral = await Referral.findById(req.params.id);

  if (!referral) {
    return next(new AppError('No referral found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      referral,
    },
  });
});

exports.createReferral = catchAsync(async (req, res, next) => {
  const newReferral = await Referral.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      referral: newReferral,
    },
  });
});

exports.updateReferral = catchAsync(async (req, res, next) => {
  const updatedReferral = await Referral.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedReferral) {
    return next(new AppError('No referral found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      referral: updatedReferral,
    },
  });
});

exports.deleteReferral = catchAsync(async (req, res, next) => {
  const referral = await Referral.findByIdAndDelete(req.params.id);

  if (!referral) {
    return next(new AppError('No referral found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
