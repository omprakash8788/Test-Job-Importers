const Job = require("../models/Job");
const ImportLog = require("../models/ImportLog");
const sanitizeObject = require("../utils/sanitize");
const parseDate = require("../utils/parseDate");

const processJobsBatch = async (jobBatch) => {
  let newJobs = 0;
  let updatedJobs = 0;
  let failedJobs = 0;
  const failures = [];

  for (const jobData of jobBatch) {
    try {
      //   const jobId = jobData.guid || jobData.link; // unique identifier fallback

      const jobId =
        typeof jobData.guid === "object"
          ? jobData.guid._ || jobData.link
          : jobData.guid || jobData.link;

      const existing = await Job.findOne({ jobId });
      console.log("pubDate raw value:", jobData.pubDate);
      const description =
        typeof jobData.description === "object"
          ? JSON.stringify(jobData.description)
          : jobData.description || "";

      const jobDoc = {
        jobId,
        title: jobData.title,
        company: jobData["dc:creator"] || "Unknown",
        description: sanitizeObject(description),
        location: sanitizeObject(jobData.location || "Remote"),
        url: sanitizeObject(jobData.link),
        createdAt: parseDate(jobData.pubDate),
        updatedAt: new Date(),
      };

      if (existing) {
        await Job.updateOne({ jobId }, jobDoc);
        updatedJobs++;
      } else {
        await Job.create(jobDoc);
        newJobs++;
      }
    } catch (err) {
      failedJobs++;
      failures.push(`${err.message} (jobId: ${jobData.guid || jobData.link})`);

      console.error("Job failed:", {
        error: err.message,
        jobId: jobData.guid || jobData.link,
        title: jobData.title,
        company: jobData["dc:creator"],
        descriptionType: typeof jobData.description,
        rawDescription: jobData.description,
      });
    }
  }

  await ImportLog.create({
    timestamp: new Date(),
    totalFetched: jobBatch.length,
    totalImported: newJobs + updatedJobs,
    newJobs,
    updatedJobs,
    failedJobs,
    failures,
  });

  console.log(
    `Batch done → New: ${newJobs}, Updated: ${updatedJobs}, Failed: ${failedJobs}`
  );
};

module.exports = processJobsBatch;
