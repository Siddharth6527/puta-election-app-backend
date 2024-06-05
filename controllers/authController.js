const jwt = require('jsonwebtoken');
const Voter = require('../models/voterModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// const signToken = (reqId) => {
//   jwt.sign({ id: reqId }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await Voter.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    sno: req.body.sno,
    designation: req.body.designation,
    memebershipCategory: req.body.memebershipCategory,
    receiptNo: req.body.receiptNo,
    college: req.body.college,
    voted: req.body.voted,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 2) Check if user exits && password in correct
  const user = await Voter.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  res.status(200).json({
    status: 'success',
    token: token,
  });
});
