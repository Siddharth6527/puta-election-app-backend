const jwt = require('jsonwebtoken');
const Voter = require('../models/voterModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// const signToken = (id)=>{
//   jwt.sign({id}, process.)
// }
