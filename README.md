## 1- Folder structre of client and server.

artha-job-importer/                    ← root of the repository
│
├── /client/                           ← Next.js Admin UI
│   ├── components/                    ← UI components (ImportTable)
│   ├── pages/                         ← Next.js pages (index.js)
│   ├── utils/                         ← Axios instance for API
│   ├── public/                        ← Static assets
│   └── package.json                   ← Frontend dependencies & scripts
│
├── /server/                           ← Node.js Express backend
│   ├── config/                        ← MongoDB & Redis connection setup
│   │   ├── db.js
│   │   └── redis.js
│   ├── jobs/                          ← Background jobs & CRON
│   │   ├── jobFetcher.js             ← Fetch XML → Queue
│   │   ├── jobProcessor.js           ← Queue Worker (Bull)
│   │   ├── queue.js                  ← Bull queue instance
│   │   └── scheduler.js              ← Runs fetcher every 1 hour
│   ├── models/                        ← Mongoose schemas
│   │   ├── Job.js
│   │   └── ImportLog.js
│   ├── routes/                        ← Express routes (import logs API)
│   │   └── importRoutes.js
│   ├── services/                      ← Business logic (upsert, logging)
│   │   └── jobService.js
│   ├── utils/                         ← Utility functions (XML parser)
│   │   └── xmlParser.js
│   ├── server.js                      ← Main Express app entry point
│   ├── .env                           ← Env variables (MONGO, REDIS, PORT)
│   └── package.json                   ← Backend dependencies & scripts
│
├── /docs/
│   └── architecture.md                ← System design explanation
│
├── README.md                          ← Setup instructions, usage, assumptions
│
└── .gitignore                         ← Node, Next.js, env, log files, etc.


## 2- Setup Environment Variables
/server/.env
PORT=5000
MONGODB_URI=mongodb://*******************/job_importer
REDIS_URL=redis://localhost:6379


##  How to Run Server and Client Locally
1. Start the Backend Server
cd server
npm run dev 

* Start Backend Worker and Scheduler
npm run worker      # Processes job queue
npm run scheduler   # Triggers fetch every hour

## Note - To test manually, you can also trigger a fetch:
npm run fetch

Recommended: Run dev, worker, and scheduler in separate terminal tabs


## 2. Start the Frontend Client

cd ../client
npm run dev    



