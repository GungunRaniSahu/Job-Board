const Job = require('../models/Job');

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

exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
