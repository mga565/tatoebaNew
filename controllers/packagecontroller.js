const Package = require('../models/packagesmodel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllPackages = catchAsync(async (req, res, next) => {
  const packages = await Package.find();

  res.status(200).json({
    status: 'success',
    results: packages.length,
    data: {
      packages,
    },
  });
});

exports.getPackage = catchAsync(async (req, res, next) => {
  const package = await Package.findById(req.params.id);

  if (!package) {
    return next(new AppError('No package found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      package,
    },
  });
});

exports.createPackage = catchAsync(async (req, res, next) => {
  const newPackage = await Package.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      package: newPackage,
    },
  });
});

exports.updatePackage = catchAsync(async (req, res, next) => {
  const updatedPackage = await Package.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedPackage) {
    return next(new AppError('No package found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      package: updatedPackage,
    },
  });
});

exports.deletePackage = catchAsync(async (req, res, next) => {
  const package = await Package.findByIdAndDelete(req.params.id);

  if (!package) {
    return next(new AppError('No package found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
