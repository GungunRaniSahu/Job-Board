const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const cors = require('cors');
const port = 5000;  // Port number can be modified if needed
require('dotenv').config();

const app = express();

// Middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Routes for authentication and jobs
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
