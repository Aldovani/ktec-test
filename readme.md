# KTEC - Backend test project

### About this project

This is a backend API for a technical test. It provides endpoints for user authentication and user management. The API is built with Node.js, Express, and MongoDB.

## Tech stack

- **Node.js** 20+
- **Express** – REST API
- **mongoDB** – database
- **Mongoose** – ORM
- **JWT** – authentication
- **Zod** – validation

## How to run

### Prerequisites

- Node.js 20+
- mongoDB
- git

## 1. Clone the repository

```bash
git clone https://github.com/aldovani/ktec-test.git
cd ktec-test
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

```bash
cp env.example .env
```

Edit `.env`:

| Variable        | Required | Description                                                       |
| --------------- | -------- | ----------------------------------------------------------------- |
| port            | No       | Server port (default: `8080`)                                     |
| JWT_SECRET      | Yes      | Secret key for signing JWTs (use a strong random string)          |
| MONGO_URI       | Yes      | MongoDB connection string (e.g. `mongodb://localhost:27017/ktec`) |
| MONGO_ROOT_USER | Yes      | MongoDB root username (e.g. `root`)                               |
| MONGO_ROOT_PASS | Yes      | MongoDB root password (e.g. `password`)                           |

### 4. Start the server

**Development:**

```bash
npm run dev
```

**Production:**

```bash
npm run build
npm run start
```

API at `http://localhost:8080`. Swagger docs (when enabled): `http://localhost:8080/docs`.

## Scripts

| Command            | Description                |
| ------------------ | -------------------------- |
| `npm run dev`      | Dev server with hot reload |
| `npm run build`    | Production build           |
| `npm run start`    | Run production build       |
| `npm run test`     | Tests unit                 |
| `npm run test:e2e` | End-to-end tests           |

## Recurring transactions (cron)

To process recurring transactions daily, run as a cron job:

```bash
npm run build
npm run cron:process-recurrences
```

## Project structure

```
src/
├── app.ts              # Express app
├── bootstrap.ts        # Entry point
├── application/        # API modules (auth, users)
│    ├─ contracts/      # DTOs, interfaces, etc.
│    ├─ controller/     # Express controllers
│    ├─ entities/       # Domain entities (e.g. User)
│    ├─ errors/         # Custom error classes
│    ├─ services/       # Application services (business logic)
│    ├─ use-cases/      # Use case implementations (e.g. RegisterUserUseCase)
│
├── infra/
│    ├── http/          # Express routes & middleware
│    ├── database/      # MongoDB (repositories, models, etc.)
│
├── kernel/              # Core domain logic (services, entities, value objects)
├── shared/
│   ├── config/          # env, Firebase
│   ├── types/           # TypeScript types
├── utils/               # General utilities
│
│tests/
├── unit/                # Unit tests
├── e2e/                 # End-to-end tests
├── setup.ts             # Test setup (e.g. test database)

```
