const Job = require('../models/jobModel');

exports.createJob = async (req, res) => {
  const { title, description, company, location, salary } = req.body;
  const employerId = req.user.id;
  try {
    const newJob = new Job({ title, description, company, location, salary, employerId });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const jobs = await Job.find().skip(skip).limit(limit);
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employerId: req.user.id });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
