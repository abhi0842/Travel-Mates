# Docker setup for Travel_Buddy

This project includes Dockerfiles and a docker-compose setup to run the frontend (React + nginx), backend (Node/Express), and MongoDB together.

Quick start (Windows PowerShell):

1. From the repository root (where this file and `docker-compose.yml` live) run:

```powershell
docker compose up --build
```

2. Open the frontend at http://localhost:3000. The frontend proxies API requests at /api to the backend.

Ports used:
- Frontend (nginx): 3000 -> container 80
- Backend: 5000 -> container 5000
- MongoDB: default 27017 (internal)

Environment variables:
- The backend reads MONGO_URI from the environment. By default docker-compose sets it to `mongodb://mongo:27017/travel_connect`.

Notes / Troubleshooting:
- If you already have services running on ports 3000 or 5000, stop them or change the published ports in `docker-compose.yml`.
- To run in detached mode: `docker compose up -d --build`.
- To remove containers and volumes: `docker compose down -v` (warning: removes DB data).
