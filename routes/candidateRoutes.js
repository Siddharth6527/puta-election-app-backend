const express = require('express');
const candidateController = require('../controllers/candidateController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'dev', 'voter'),
    candidateController.getAllCandidates,
  )
  .post(
    authController.protect,
    authController.restrictTo('admin', 'dev'),
    candidateController.addCandidates,
  );

router
  .route('/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'dev'),
    candidateController.getCandidate,
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'dev'),
    candidateController.updateCandidates,
  );
// .delete(candidateController.deleteCandidates);

// CUSTOM ROUTES
router.get(
  '/votesUpdate/:posId/:canId',
  authController.protect,
  authController.restrictTo('admin', 'voter', 'dev'),
  candidateController.votesUpdate,
);
router
  .route('/:posId/:canId')
  .get(
    authController.protect,
    authController.restrictTo('dev', 'admin'),
    candidateController.deleteCandidates,
  );

module.exports = router;
