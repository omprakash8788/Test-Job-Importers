const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobId: { type: String, unique: true }, // unique key from API
  title: String,
  company: String,
  description: String,
  location: String,
  url: String,
  createdAt: Date,
  updatedAt: Date
});

module.exports = mongoose.model('Job', jobSchema);
