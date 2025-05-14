const express = require('express');
const router = express.Router();
const Job = require('../models/jobModel'); 

// Create a new job
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

// Fetch jobs with pagination
router.get('/', async (req, res) => {
  try {
    // Extract page and limit from query parameters, with default values if not provided
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 5; // Default to 5 jobs per page
    
        const skip = (page - 1) * limit;

    
    const jobs = await Job.find()
      .skip(skip)
      .limit(limit);

    res.status(200).json(jobs);
  } catch (err) {
    res.status(400).json({ error: 'Error fetching jobs', details: err });
  }
});

module.exports = router;
