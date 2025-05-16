const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

const cors = require('cors');
const port = 5000;
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
