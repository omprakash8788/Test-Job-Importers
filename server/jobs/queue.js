const Queue = require('bull');
const redis = require('../config/redis');

// This queue will connect to a Redis server running on localhost:6379
// Bull uses this Redis connection to manage job states (waiting, active, completed, failed, etc.)
const jobQueue = new Queue('job-import-queue', {
  redis: { host: 'localhost', port: 6379 }
});

module.exports = jobQueue;
