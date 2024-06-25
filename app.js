const express = require('express');
const morgan = require('morgan');

const app = express();
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const voterRouter = require('./routes/voterRoutes');
const candidateRouter = require('./routes/candidateRoutes');

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const corsOptions = {
  // origin: 'https://www.pantuniversityputa.in/',
  origin: 'https://puta-election-app-frontend.onrender.com',
  // origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES

app.use('/api/v1/voters', voterRouter);
app.use('/api/v1/candidates', candidateRouter);

// FOR HANDLING UNHANDLED ROUTES
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 400));
});

// GLOBAL ERROR HANDLING
app.use(globalErrorHandler);

// 4) START SERVER
module.exports = app;
