# Fleet Service

A full-stack fleet management application built with TypeScript.

The system allows users to:

* Create and list vehicles
* Record trips for vehicles
* Filter and paginate trips
* View per-vehicle aggregated statistics
* Run the application locally using Docker and PostgreSQL

---

# Tech Stack

## Backend

* Node.js
* TypeScript
* Express
* PostgreSQL
* Drizzle ORM
* Vitest

## Frontend

* React
* TypeScript
* Vite

---

# Project Structure

```text
questarTask/
├── backend/
├── frontend/
└── docker-compose.yml
```

---

# Prerequisites

Install:

* Docker Desktop
* Node.js (v20+ recommended)
* npm

---

# Running the Database

Start PostgreSQL:

```bash
docker compose up -d
```

Verify the container is running:

```bash
docker ps
```

---

# Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Run database migrations:

```bash
npm run db:migrate
```

Seed the database:

```bash
npm run seed
```

Create a `.env` file in the backend directory based on `.env.example`.

Start the backend server:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

---

# Frontend Setup

Open a second terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The UI will be available at:

```text
http://localhost:5173
```

---

# Running Tests

From the backend directory:

```bash
npm test
```

Tests cover:

* Pagination logic
* Trip validation
* Vehicle summary aggregation

---

# API Features

## Vehicles

* Create vehicle
* List vehicles
* Vehicle summary

## Trips

* Record trip
* Filter by vehicle
* Filter by date range
* Pagination support

---

# Database

The application uses PostgreSQL running in Docker.

Migrations are managed through Drizzle ORM.

Indexes were added to support efficient trip filtering:

* Vehicle ID index
* Vehicle ID + Start Time index

---

# Validation

The API validates:

* Vehicle existence before trip creation
* Trip end time must be after start time
* Distance must be positive
* Energy usage must be positive

Appropriate HTTP status codes and error messages are returned for invalid requests.

## Verify Services

Backend health check:

GET http://localhost:3000/health

Frontend:

Open http://localhost:5173
