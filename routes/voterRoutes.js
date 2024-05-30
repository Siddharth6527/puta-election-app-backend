const express = require('express');
const voterController = require('../controllers/voterControllers');

const router = express.Router();

router
  .route('/')
  .get(voterController.getAllVoters)
  .post(voterController.createVoter);

router
  .route('/:id')
  .get(voterController.getVoter)
  .patch(voterController.createVoter)
  .delete(voterController.deleteVoter);

module.exports = router;
