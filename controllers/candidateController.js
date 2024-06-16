const Candidate = require('../models/candidateModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const Voter = require('../models/voterModel');
const AppError = require('../utils/appError');

exports.getAllCandidates = catchAsync(async (req, res) => {
  const features = new APIFeatures(Candidate.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const candidates = await features.query;

  res.status(200).json({
    status: 'success',
    results: candidates.length,
    data: candidates,
  });
});

exports.getCandidate = catchAsync(async (req, res) => {
  const candidates = await Candidate.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: { candidates },
  });
});

exports.addCandidates = catchAsync(async (req, res) => {
  const candidates = await Candidate.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { candidates },
  });
});

exports.updateCandidates = catchAsync(async (req, res) => {
  const members = await Candidate.findById(req.params.id);
  const { candidates } = members;
  req.body.candidates.forEach((el) => candidates.push(el));
  await members.save();

  res.status(201).json({
    status: 'success',
    data: { members },
  });
});

exports.deleteCandidates = catchAsync(async (req, res) => {
  const position = await Candidate.findById(req.params.posId);
  position.candidates = position.candidates.filter(
    (el) => el.id !== req.params.canId,
  );
  await position.save();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.votesUpdate = catchAsync(async (req, res, next) => {
  const pos = await Candidate.findById(req.body.posId);

  if (!pos) {
    return next(new AppError('The position not found! Please try again.', 400));
  }

  pos.candidates.forEach((el) => {
    if (el.id === req.body.canId) {
      el.voteCount += 1;
    }
  });

  await pos.save();

  // for updating the voter (voted: true)
  await Voter.findByIdAndUpdate(req.body.voterId, {
    voted: true,
  });

  res.status(200).json({
    status: 200,
    message: pos,
  });
});

exports.resetVotes = catchAsync(async (req, res, next) => {
  const positions = await Candidate.find();
  positions.forEach((el) => {
    el.candidates.forEach((can) => {
      can.voteCount = 0;
    });
  });

  positions.forEach((el) => el.save());

  // Also mark all voters as un-voted
  const voters = await Voter.find({ role: 'voter' });
  voters.forEach((el) => {
    el.voted = false;
    el.save();
  });

  res.status(200).json({
    status: 'success',
    data: positions,
  });
});
