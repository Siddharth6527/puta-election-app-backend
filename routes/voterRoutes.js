const express = require('express');
const voterController = require('../controllers/voterController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post(
  '/signup',
  // authController.protect,
  // authController.restrictTo('admin', 'dev'),
  authController.signup,
);
router.post('/login', authController.login); // anyone can

router
  .route('/updatePassword')
  .patch(
    authController.protect,
    authController.restrictTo('dev', 'admin', 'voter'),
    authController.updatePasssword,
  );

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('voter', 'admin', 'dev'),
    voterController.getAllVoters,
  )
  .post(
    authController.protect,
    authController.restrictTo('admin', 'dev'),
    voterController.createVoter,
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('dev', 'voter'),
    voterController.getVoter,
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'dev'),
    voterController.updateVoter,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'dev'),
    voterController.deleteVoter,
  );

module.exports = router;
