const express = require('express');
const voterController = require('../controllers/voterController');

const router = express.Router();

router
  .route('/')
  .get(voterController.getAllVoters)
  .post(voterController.createVoter);

router
  .route('/:id')
  .get(voterController.getVoter)
  .patch(voterController.updateVoter)
  .delete(voterController.deleteVoter);

module.exports = router;
