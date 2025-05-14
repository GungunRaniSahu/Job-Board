const Job = require('../models/jobModel');

exports.createJob = async (req, res) => {
  const { title, description, company, location, salary } = req.body;
  const employerId = req.user.id;

  try {
    const newJob = new Job({ title, description, company, location, salary, employerId });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ message: 'Error creating job', error: err.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching jobs', error: err.message });
  }
};

exports.getUserJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employerId: req.user.id }).sort({ postedAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user jobs', error: err.message });
  }
};
