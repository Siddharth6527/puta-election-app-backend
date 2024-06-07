const express = require('express');
const candidateController = require('../controllers/candidateController');

const router = express.Router();

router.get('/votesUpdate/:posId/:canId', candidateController.votesUpdate);

router
  .route('/')
  .get(candidateController.getAllCandidates)
  .post(candidateController.addCandidates);

router
  .route('/:id')
  .get(candidateController.getCandidate)
  .patch(candidateController.updateCandidates)
  .delete(candidateController.deleteCandidates);

module.exports = router;
