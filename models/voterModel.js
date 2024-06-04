const mongoose = require('mongoose');
const validator = require('validator');

const voterSchema = new mongoose.Schema({
  sno: {
    type: Number,
    required: [true, 'A voter must have serial no'],
  },
  name: {
    type: String,
    required: [true, 'A voter must have a name'],
    trim: true,
    minLength: 5,
  },
  designation: {
    type: String,
    required: [true, 'A voter must have designation'],
    minLength: 2,
  },
  college: {
    type: String,
    required: [true, 'A voter must have a college'],
    trim: true,
    minLength: 5,
  },
  receiptNo: {
    type: Number,
    required: [true, 'A voter must have receipt number'],
  },
  voted: {
    type: Boolean,
    required: [true, 'A voter may or may not have voted'],
    default: false,
  },
  memebershipCategory: {
    type: String,
    default: 'General',
    minLength: 3,
  },
  email: {
    type: String,
    required: [true, 'A voter must have a email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    minLength: 8,
    // select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true],
    validate: {
      // this only works on CREATE and SAVE!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
});

const Voter = mongoose.model('Voter', voterSchema);

module.exports = Voter;
