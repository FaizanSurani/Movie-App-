#  Movie Management Application (MERN Stack)

A full-stack Movie Management application built using the **MERN stack** with **authentication**, **admin movie management**, **search & pagination**, and **background processing using queues and workers**.

---

##  Features

###  User
- View all movies
- Client-side pagination
- Search movies by title or description
- Sort movies by title, rating, release date, and duration
- IMDb-style clean UI

---

###  Authentication
- User Signup & Login
- JWT-based authentication
- Role-based access control (`user`, `admin`)

---

###  Admin
- Add movies using popup form
- Edit existing movies
- Delete movies with confirmation dialog
- Protected admin actions
- Prevents duplicate movie entries

---

###  Queue & Worker
- Background processing using **BullMQ**
- Redis-based queue system
- Separate worker service for scalability
- Supports **local Redis** and **Redis Cloud (free tier)**

---

##  Tech Stack

### Frontend
- React.js
- Material UI (MUI)
- Axios
- React Router
- Deployed on **Vercel / Netlify**

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- Deployed on **Render**

### Queue & Worker
- BullMQ
- Redis
- Redis Cloud (free tier)

---

```
##  Project Structure

root/
├── client/ # React frontend
├── server/ # Backend API
│ ├── src/
│ │ ├── controllers
│ │ ├── models
│ │ ├── routes
│ │ ├── queue
│ │ ├── workers
│ │ ├── scripts
│ │ └── app.js
└── README.md
```


````
##  WSL & Redis Local Setup (Windows)
---

###  Install WSL
Open **PowerShell as Administrator** and run:
```powershell
wsl --install
````
Restart your system when prompted.
---

###  Open Ubuntu (WSL)

* Launch **Ubuntu** from the Start Menu
* Create a **UNIX username and password**
---

###  Update System Packages

```bash
sudo apt update && sudo apt upgrade -y
```

---

###  Install Redis Server

```bash
sudo apt install redis-server -y
```

---

###  Start Redis Service

```bash
sudo service redis-server start
```

---

###  Verify Redis Is Running

```bash
redis-cli ping
```

Expected output:

```text
PONG
```

---

###  Redis Local Configuration

Use the following Redis connection settings for local development:

```
Host: 127.0.0.1
Port: 6379
Username: not required
Password: not required
```

---

###  Restart Redis (If Needed)

```bash
sudo service redis-server restart
```

---

###  Stop Redis (Optional)

```bash
sudo service redis-server stop
```

---

###  Redis is now ready for BullMQ workers and queues

```

````md
This project consists of:
- React Frontend
- Node.js + Express Backend
- MongoDB
- Redis (for queue & worker)
- BullMQ worker for background movie insertion

---

##  Backend Setup

###  Navigate to Backend Folder
```bash
cd server
````

---

###  Install Dependencies

```bash
npm install
```

---

###  Start Backend Server

```bash
npm run dev
```

Backend will start on:

```
http://localhost:5000
```

---

##  Seeding IMDb Top 250 Movies (Optional)

This step is **optional** and used to initially populate the database with IMDb Top 250 movies.

###  Ensure Redis is Running

(See WSL + Redis setup section)

Verify:

```bash
redis-cli ping
```

---

###  Run Seed Script

```bash
node src/scripts/seedTop250Movies.js
```

What this does:

* Reads IMDb Top 250 IDs
* Fetches movie data from OMDb API
* Pushes jobs to Redis queue
* Worker inserts movies into MongoDB

---

##  Worker Setup (Required for Queue Processing)

The worker listens to Redis and inserts movies into MongoDB.

###  Open a New Terminal (Keep Backend Running)

```bash
cd server
```

---

###  Start Worker

```bash
node src/workers/movieWorker.js
```

Expected output:

```text
 Movie worker running
```

---

###  Important

* Backend server **must be running**
* Redis **must be running**
* Worker **must be running**
* MongoDB **must be connected**

---

##  Frontend Setup

###  Navigate to Frontend Folder

```bash
cd client
```

---

###  Install Dependencies

```bash
npm install
```

---

###  Start Frontend

```bash
npm run dev
```

Frontend will start on:

```
http://localhost:5173
```

---

##  Admin Features

* Login as **Admin**
* Add Movie (Popup Form)
* Edit Movie
* Delete Movie
* Changes reflect instantly in UI and database

---

##  Architecture Summary

* **Frontend** → React + MUI
* **Backend** → Express + MongoDB
* **Queue** → BullMQ + Redis
* **Worker** → Background processing for bulk inserts
* **Pagination & Search** → Frontend-based

---

##  Requirements Covered

 User Authentication
 Admin Role Access
 Movie CRUD
 Search & Sort
 Pagination
 Background Queue Processing
 IMDb Top 250 Seeding
 Clean UI with MUI

---

## Deployment Details

Frontend is deployed on **Vercel** using React (Vite).

Backend API is deployed on **Render** using Node.js and Express.

MongoDB is hosted on **MongoDB Atlas (Cloud)**.

```
