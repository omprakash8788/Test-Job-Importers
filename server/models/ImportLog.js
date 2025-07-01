const mongoose = require('mongoose');

const importLogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  totalFetched: Number,
  totalImported: Number,
  newJobs: Number,
  updatedJobs: Number,
  failedJobs: Number,
  failures: [String] // array of failure reasons
});

module.exports = mongoose.model('ImportLog', importLogSchema);
