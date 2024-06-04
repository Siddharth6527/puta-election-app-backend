const Voter = require('../models/voterModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllVoters = catchAsync(async (req, res) => {
  const features = new APIFeatures(Voter.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const voters = await features.query;

  res.status(200).json({
    status: 'success',
    results: voters.length,
    data: { voters },
  });
});

exports.getVoter = catchAsync(async (req, res) => {
  const voter = await Voter.findById(req.params.id);
  // Tour.findOne({_id: req.params.id})

  res.status(200).json({
    status: 'success',
    data: {
      voter,
    },
  });
});

exports.createVoter = catchAsync(async (req, res) => {
  const newVoter = await Voter.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      voter: newVoter,
    },
  });
});

exports.updateVoter = catchAsync(async (req, res) => {
  const voter = await Voter.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    status: 'success',
    data: { voter },
  });
});

exports.deleteVoter = catchAsync(async (req, res) => {
  await Voter.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    message: null,
  });
});
