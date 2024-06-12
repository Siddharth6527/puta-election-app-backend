const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const voterSchema = new mongoose.Schema({
  // sno: {
  //   type: Number,
  //   required: [true, 'A voter must have serial no'],
  // },
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
    unique: [true, 'A voter must have a unique receiipt number'],
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
    // default: 'voter@puta2024.in',
  },
  role: { type: String, enum: ['voter', 'admin'], default: 'voter' },
  password: {
    type: String,
    minLength: 8,
    // select: false,
    // default: 'helloIamVoter@puta2024',
  },
  passwordConfirm: {
    type: String,
    // required: [true],
    // select: false,
    // default: 'helloIamVoter@puta2024',
    validate: {
      // this only works on CREATE and SAVE!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: {
    type: Date,
  },
});

// SAVING THE ENCRYPTED PASSWORD
voterSchema.pre('save', async function (next) {
  // only run this function if the password is actually modified
  if (!this.isModified('password')) return next();

  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

// INSTANCE FUNCTION ~ available on all documents
voterSchema.methods.correctPassword = async function (
  voterPassword,
  userPassword,
) {
  return await bcrypt.compare(voterPassword, userPassword);
};

voterSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );

    return JWTTimeStamp < changedTimeStamp; // 100 < 200
  }

  // False means NOT changed
  return false;
};

const Voter = mongoose.model('Voter', voterSchema);

module.exports = Voter;
