const express = require('express');
const router = express.Router();
const Job = require('../models/jobModel'); // Import the Job model

// Route to create a new job
router.post('/create', async (req, res) => {
  try {
    const { title, description, company, location, salary } = req.body;

    const newJob = new Job({
      title,
      description,
      company,
      location,
      salary
    });

    await newJob.save();
    res.status(201).json({ message: 'Job created successfully!', job: newJob });
  } catch (err) {
    res.status(400).json({ error: 'Error creating job', details: err });
  }
});

// Route to get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching jobs', details: err });
  }
});

module.exports = router;
