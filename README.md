# CodeOrbit – Cloud IDE Platform  
> A zero-install, browser-based code editor with **GitHub OAuth**, **SQLite persistence**, and **real-time collaboration** coming in later days.

---

## 🚀  Quick Start (Days 0-2)

| Task                     | Command                                  |
|--------------------------|------------------------------------------|
| Install & run both servers| `npm run dev`                           |
| View database in GUI     | `npx prisma studio`                      |
| GitHub OAuth test        | <http://localhost:4000/api/auth/github>  |

---

## 📁  Project Structure

```
cloud-ide-platform/
├── apps/
│   ├── web/           # React + Vite + Monaco (Day 3+)
│   └── api/           # Express + SQLite + OAuth (Days 0-2)
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── dev.db   ← SQLite file
│       ├── src/
│       │   ├── index.js
│       │   └── routes/
│       │       └── auth.js
│       └── .env
├── packages/          # Shared libs (future)
└── README.md
```

---

## 🧰  Tech Stack (Days 0-2)

| Layer      | Tech                                         |
|------------|----------------------------------------------|
| Front-end  | React, Vite, Tailwind (skeleton)             |
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
5. Redirect to front-end (`http://localhost:5173/projects`)

---

## 🔑  Environment Variables (`.env`)

```bash
# apps/api/.env  (example)
DATABASE_URL=file:./dev.db
JWT_SECRET=your-64-char-random-string
GITHUB_CLIENT_ID=xxxxxxxxxxxxxxxxxxxx
GITHUB_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WEB_URL=http://localhost:5173
```

---

## 🗃️ Database Schema

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
  owner     User     @relation(fields: [ownerId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## 🧪 Manual Checks (Day 2 complete)

| Test                | Expected Result                           |
|---------------------|-------------------------------------------|
| npm run dev         | Vite:5173, API:4000                       |
| Visit /api/auth/github | GitHub auth → redirect to /projects   |
| Prisma Studio       | Shows logged-in user row                   |

---

## 🚧 Roadmap

- **Day 3** – Monaco Editor, save/load projects
- **Day 4** – Dockerized code execution with Bull queue
- **Day 5** – Real-time collaboration via Socket.IO
- **Day 6** – Production build & deploy