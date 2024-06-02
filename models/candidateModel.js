const mongoose = require('mongoose');

const candidatesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A candidate must have a name'],
    minLength: 5,
  },
  college: {
    type: String,
    required: [true, 'A voter must have a college'],
    trim: true,
    minLength: 5,
  },
  collegeInitials: {
    type: String,
    required: [true, 'A voter must have a college initials'],
    trim: true,
    minLength: 2,
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
    unique: true,
    minLength: 3,
  },
  candidates: [candidatesSchema],
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
