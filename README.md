## 1- Folder Structure of Client and Server

```
Importer/                    ← root of the repository
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
```

## 2- Setup Environment Variables

Create a `.env` file inside `/server/`:

```
PORT=5000
MONGODB_URI=mongodb://*******************/job_importer
REDIS_URL=redis://localhost:6379
```

## 3- How to Run Server and Client Locally

### Start the Backend Server

```bash
cd server
npm run dev 
```

### Start Backend Worker and Scheduler

```bash
npm run worker      # Processes job queue
npm run scheduler   # Triggers fetch every hour
```

**Note:** To test manually, you can also trigger a fetch:

```bash
npm run fetch
```

_Recommended: Run dev, worker, and scheduler in separate terminal tabs_

### Start the Frontend Client

```bash
cd ../client
npm install
npm run dev 
```

> ⚠️ **Important Note**  
> This project is currently running the backend (`/server`) **locally only**.  
> The Vercel frontend at [https://job-importer.vercel.app/](https://job-importer.vercel.app/) will **not load any data** unless your local backend server is running at `http://localhost:5000`.
>
> 
### Final Output 
![image](https://github.com/user-attachments/assets/d3262ecf-9958-4d6a-b490-75283078024f)
