const express = require('express');
const router = express.Router();
const { createJob, getAllJobs, getUserJobs } = require('../controllers/jobController');
const authenticate = require('../middleware/authMiddleware');

router.post('/create', authenticate, createJob);

router.get('/', getAllJobs);

router.get('/my-jobs', authenticate, getUserJobs);

module.exports = router;
