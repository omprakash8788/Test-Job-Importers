const axios = require('axios');
const parseXML = require('../utils/xmlParser');
const jobQueue = require('./queue');

const FEED_URLS = [
  'https://jobicy.com/?feed=job_feed',
  'https://jobicy.com/?feed=job_feed&job_categories=smm&job_types=full-time',
  'https://jobicy.com/?feed=job_feed&job_categories=seller&job_types=full-time&search_region=france',
  'https://jobicy.com/?feed=job_feed&job_categories=design-multimedia',
  'https://jobicy.com/?feed=job_feed&job_categories=data-science',
  'https://jobicy.com/?feed=job_feed&job_categories=copywriting',
  'https://jobicy.com/?feed=job_feed&job_categories=business',
  'https://jobicy.com/?feed=job_feed&job_categories=management',
  'https://www.higheredjobs.com/rss/articleFeed.cfm'
];

const fetchAndQueueJobs = async () => {
  for (const url of FEED_URLS) {
    try {
      const { data: xmlData } = await axios.get(url);
      const json = await parseXML(xmlData);

      const jobs = json?.rss?.channel?.item || [];

      for (const job of jobs) {
        await jobQueue.add(job, {
          attempts: 3, // retry logic
          backoff: 5000 // retry after 5s
        });
      }

      console.log(`Fetched and queued ${jobs.length} jobs from: ${url}`);
    } catch (err) {
      console.error(`Failed fetching from ${url}:`, err.message);
    }
  }
};

// allow script to run standalone
if (require.main === module) {
  fetchAndQueueJobs();
}

module.exports = fetchAndQueueJobs;
