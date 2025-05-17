const Application = require('../models/Application');
const Job = require('../models/jobModel');
const User = require('../models/User');

exports.applyToJob = async (req, res) => {
  const { jobId, coverLetter, resumeUrl } = req.body;
  const seekerId = req.user.id;

  if (!jobId || !coverLetter) {
    return res.status(400).json({ message: 'Job ID and cover letter are required' });
  }

  try {
    const user = await User.findById(seekerId);
    if (!user || user.role !== 'seeker') {
      return res.status(403).json({ message: 'Only job seekers can apply' });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const existing = await Application.findOne({ job: jobId, applicant: seekerId });
    if (existing) {
      return res.status(400).json({ message: 'You already applied to this job' });
    }

    const application = await Application.create({
      job: jobId,
      applicant: seekerId,
      coverLetter,
      resumeUrl,
      status: 'pending'
    });

    res.status(201).json({
      message: 'Application submitted successfully',
      jobTitle: job.title,
      applicantName: user.name,
      applicationId: application._id
    });

  } catch (err) {
    console.error("Apply Error:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
