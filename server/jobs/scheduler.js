require('dotenv').config();
const cron = require('node-cron');
const connectDB = require('../config/db');
const fetchAndQueueJobs = require('./jobFetcher');

connectDB();

// Schedule every hour
cron.schedule('0 * * * *', async () => {
  console.log('Running scheduled job fetch...');
  await fetchAndQueueJobs();
});

console.log('CRON Scheduler started (every 1 hour)');
