const express = require('express');
const router = express.Router();
const { applyToJob } = require('../controllers/applicationController');
const authenticate = require('../middleware/authMiddleware');

router.post('/apply', authenticate, applyToJob);  

module.exports = router;
