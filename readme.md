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

Create a `.env` file in the backend directory based on `.env.example`.

Run database migrations:

```bash
npm run db:migrate
```

Seed the database:

```bash
npm run seed
```


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

## Tradeoffs and Design Decisions

### Minimal Frontend

The assignment requested a minimal UI, so I focused on implementing the required user flows rather than investing heavily in styling or complex state management libraries. React state (`useState` and `useEffect`) was sufficient for the application's scope.

### Summary Calculation

Vehicle summaries are calculated on demand from trip data instead of being precomputed and stored. This keeps the implementation simple and ensures the summary is always consistent with the underlying trips. For larger datasets, a materialized view or pre-aggregated table would likely be preferable.

### Database Indexes

Indexes were added on `vehicle_id` and `(vehicle_id, start_time)` because the primary query patterns involve filtering trips by vehicle and date range. Additional indexes were intentionally avoided until a demonstrated need exists.

### Validation

Only validation required for data integrity was implemented (vehicle existence, positive distance/energy values, and valid trip timestamps). More extensive validation could be added depending on business requirements.

### Testing Scope

Tests focus on the core business logic called out in the assignment: pagination, validation, and summary aggregation. Database and framework behavior were not unit tested, as those responsibilities are already covered by the underlying libraries.

### Docker Scope

The database is containerized via Docker Compose as required. The backend and frontend are run locally through Node.js to keep the setup simple and reduce build complexity for the take-home project.
