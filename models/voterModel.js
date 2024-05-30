const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A voter must have a name'],
    trim: true,
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
  voted: {
    type: Boolean,
    required: [true, 'A voter may or may not have voted'],
  },
});

const Voter = mongoose.model('Voter', voterSchema);

module.exports = Voter;
