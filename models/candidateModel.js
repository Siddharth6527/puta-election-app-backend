const mongoose = require('mongoose');

const candidatesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A candidate must have a name'],
  },
  college: {
    type: String,
    required: [true, 'A voter must have a college'],
    trim: true,
  },
  collegeInitials: {
    type: String,
    required: [true, 'A voter must have a college initials'],
    trim: true,
  },
  voteCount: {
    type: Number,
    // required: [true, 'A candidate must have a vote count'],
    default: 0,
  },
});

const candidateSchema = new mongoose.Schema({
  position: {
    type: String,
    required: [true, 'Must have a position'],
  },
  candidates: [candidatesSchema],
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
