const Candidate = require('../models/candidateModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllCandidates = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getCandidate = async (req, res) => {
  try {
    const candidates = await Candidate.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: { candidates },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.addCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { candidates },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
    );

    res.status(201).json({
      status: 'success',
      data: { candidates },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteCandidates = async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
