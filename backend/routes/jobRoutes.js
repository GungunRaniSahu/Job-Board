const express = require('express');
const router = express.Router();

const { createJob, getUserJobs, getAllJobs } = require('../controllers/jobController');
const Application = require('../models/Application');
const User = require('../models/User');
const Job = require('../models/jobModel');
const authenticate = require('../middleware/authMiddleware');

router.post('/create', authenticate, createJob);

router.get('/my-jobs', authenticate, getUserJobs);

router.get('/', getAllJobs);

router.get('/:jobId/applicants', authenticate, async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user.id;

  try {
    const job = await Job.findById(jobId);
    if (!job || job.employerId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const applications = await Application.find({ job: jobId })
      .populate('applicant', 'name email');

    res.status(200).json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
  
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      if (job.employerId.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized' });
      }
  
      await job.deleteOne();
      res.status(200).json({ message: 'Job deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  

module.exports = router;
