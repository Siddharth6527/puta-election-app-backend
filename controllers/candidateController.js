const Candidate = require('../models/candidateModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

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
  members.save();

  res.status(201).json({
    status: 'success',
    data: { members },
  });
});

exports.deleteCandidates = catchAsync(async (req, res) => {
  await Candidate.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.votesUpdate = catchAsync(async (req, res) => {
  const pos = await Candidate.findById(req.params.posId);

  pos.candidates.forEach((el) => {
    if (el.id === req.params.canId) {
      el.voteCount += 1;
    }
  });

  pos.save();

  res.status(200).json({
    status: 200,
    message: pos,
  });
});
