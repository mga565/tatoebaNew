const Setting = require('../models/settingsmodel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllSettings = catchAsync(async (req, res, next) => {
  const settings = await Setting.find();

  res.status(200).json({
    status: 'success',
    results: settings.length,
    data: {
      settings,
    },
  });
});

exports.getSetting = catchAsync(async (req, res, next) => {
  const setting = await Setting.findById(req.params.id);

  if (!setting) {
    return next(new AppError('No setting found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      setting,
    },
  });
});

exports.createSetting = catchAsync(async (req, res, next) => {
  const newSetting = await Setting.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      setting: newSetting,
    },
  });
});

exports.updateSetting = catchAsync(async (req, res, next) => {
  const updatedSetting = await Setting.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedSetting) {
    return next(new AppError('No setting found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      setting: updatedSetting,
    },
  });
});

exports.deleteSetting = catchAsync(async (req, res, next) => {
  const setting = await Setting.findByIdAndDelete(req.params.id);

  if (!setting) {
    return next(new AppError('No setting found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
