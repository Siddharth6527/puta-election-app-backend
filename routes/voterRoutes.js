const express = require('express');
const voterController = require('../controllers/voterController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

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
