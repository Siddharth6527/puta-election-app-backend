const Voter = require('../models/voterModel');
// const Tour = require('../models/voterModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllVoters = async (req, res) => {
  try {
    // const voters = await Voter.find();
    // EXECUTE QUERY
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
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getVoter = async (req, res) => {
  try {
    const voter = await Voter.findById(req.params.id);
    // Tour.findOne({_id: req.params.id})

    res.status(200).json({
      status: 'success',
      data: {
        voter,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createVoter = async (req, res) => {
  // const newTour = new Tour({});
  // newTour.save();

  try {
    const newVoter = await Voter.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        voter: newVoter,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.updateVoter = async (req, res) => {
  try {
    const voter = await Voter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: 'success',
      data: { voter },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteVoter = async (req, res) => {
  try {
    await Voter.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      message: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
