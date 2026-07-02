# Notes App (React + NestJS)

A simple full-stack notes app. Backend is NestJS (in-memory storage), frontend is React (Vite).

## Structure

```
notes-app/
├── backend/   # NestJS API (http://localhost:3000)
└── frontend/  # React app (http://localhost:5173)
```

## Requirements

- Node.js 18+ and npm

## 1. Run the backend

```bash
cd backend
npm install
npm run start:dev
```

The API will be available at `http://localhost:3000/notes`.

## 2. Run the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Notes

- Data is stored in memory on the backend — it resets whenever the backend restarts. Swap the array in `notes.service.ts` for a real database (e.g. Postgres + TypeORM/Prisma) if you want persistence.
- CORS is already enabled on the backend so the frontend (port 5173) can call the API (port 3000).
- API endpoints:
  - `GET /notes` — list all notes
  - `GET /notes/:id` — get one note
  - `POST /notes` — create a note (`{ title, content }`)
  - `PUT /notes/:id` — update a note (`{ title, content }`)
  - `DELETE /notes/:id` — delete a note
