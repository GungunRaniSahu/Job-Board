const Application = require('../models/Application');

exports.applyToJob = async (req, res) => {
  const { jobId, coverLetter, resumeUrl } = req.body;
  const seekerId = req.user.id;

  if (!jobId || !coverLetter) {
    return res.status(400).json({ message: 'Job ID and cover letter are required' });
  }

  try {
    const existing = await Application.findOne({ job: jobId, applicant: seekerId });
    if (existing) {
      return res.status(400).json({ message: 'You already applied to this job' });
    }

    const application = await Application.create({
      job: jobId,
      applicant: seekerId,
      coverLetter,
      resumeUrl
    });

    res.status(201).json({ message: 'Application submitted', application });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
