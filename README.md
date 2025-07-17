# CodeOrbit – Cloud IDE Platform  
> A zero-install, browser-based code editor with **GitHub OAuth**, **SQLite persistence**, **Monaco editor**, and **real-time collaboration** coming in later days.

---

## 🚀  Quick Start (Days 0-3)

| Task                                | Command                                  |
|-------------------------------------|------------------------------------------|
| Install & run both servers          | `npm run dev`                            |
| View database in GUI                | `npx prisma studio`                      |
| GitHub OAuth test                   | `http://localhost:5172/api/auth/github`  |
| Create & save a code project        | Open Monaco → click **Save**             |

---

## 📁  Project Structure (after Day 3)

```
cloud-ide-platform/
├── apps/
│   ├── web/                 # React + Vite + Monaco + Tailwind
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── Home.tsx
│   │   │   │   └── EditorPage.tsx
│   │   └── vite.config.js
│   └── api/                 # Express + SQLite + OAuth
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── dev.db       ← SQLite file
│       ├── src/
│       │   ├── index.js
│       │   └── routes/
│       │       ├── auth.js
│       │       └── projects.js
│       └── .env
├── packages/               # Shared libs (future)
└── README.md
```

---

## 🧰  Tech Stack (Days 0-3)

| Layer      | Tech                                         |
|------------|----------------------------------------------|
| Front-end  | React, Vite, Tailwind, Monaco Editor, Axios  |
| Back-end   | Node.js, Express                             |
| Database   | SQLite via Prisma ORM                        |
| Auth       | GitHub OAuth 2.0, JWT cookie                 |
| Dev Tools  | `concurrently`, `nodemon`, Prisma Studio     |

---

## 🔐  GitHub OAuth Flow

1. User hits `/api/auth/github`  
2. Redirected to GitHub → approves app  
3. GitHub calls back `/api/auth/github/callback`  
4. Server upserts user in SQLite, signs JWT, sets cookie  
5. Redirect to front-end (`http://localhost:5173`)

---

## 🧪 Day-by-Day Deliverables

| Day   | What We Built                                                        |
|-------|-----------------------------------------------------------------------|
| **0** | Monorepo scaffold (`apps/web`, `apps/api`, packages)                  |
| **1** | React + Express running simultaneously with `concurrently`            |
| **2** | GitHub OAuth login, JWT cookie, SQLite schema (`User`, `Project`)     |
| **3** | Monaco editor page, save/load projects via REST + Prisma              |

---

## 🗃️ Database Schema (after Day 3)

```prisma
model User {
  id        String   @id @default(uuid())
  githubId  Int      @unique
  email     String
  name      String
  avatar    String?
  createdAt DateTime @default(now())
  projects  Project[]
}

model Project {
  id        String   @id @default(uuid())
  name      String
  content   String
  language  String
  ownerId   String
  owner     User?    @relation(fields: [ownerId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 🔑 Environment Variables (.env)

```bash
# apps/api/.env
DATABASE_URL=file:./dev.db
JWT_SECRET=your-64-char-random-string
GITHUB_CLIENT_ID=xxxxxxxxxxxxxxxxxxxx
GITHUB_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WEB_URL=http://localhost:5173
```

---

## 🧪 Manual Checks (Day 3 complete)

| Test Step                   | Expected Result                     |
|-----------------------------|-------------------------------------|
| npm run dev                 | Vite:5173, API:5172                 |
| Visit / → click New Project | Monaco editor loads                 |
| Type code → Save            | Redirects to /editor/<uuid>         |
| Refresh page                | Code persists                       |
| Prisma Studio               | Shows new project row               |

---

## 🚧 Roadmap

- **Day 4** – Dockerized code execution with Bull queue
- **Day 5** – Real-time collaboration via Socket.IO
- **Day 6** – Production build & deploy