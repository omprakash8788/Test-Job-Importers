require('dotenv').config();
const connectDB = require('../config/db');
const jobQueue = require('./queue');
const processJobsBatch = require('../services/jobService');

connectDB();

jobQueue.process(async (job, done) => {
  try {
    await processJobsBatch([job.data]); // single job per queue item
    done();
  } catch (err) {
    console.error(' Worker failed to process job:', err.message);
    done(new Error(err));
  }
});

console.log('Job Worker Running...');
