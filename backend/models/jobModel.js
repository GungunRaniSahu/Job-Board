const mongoose = require('mongoose');

// Define the schema for the Job model
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  postedAt: { type: Date, default: Date.now }
});

// Create the Job model from the schema
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
