const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const cors = require('cors');
const port = 5000;
require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
