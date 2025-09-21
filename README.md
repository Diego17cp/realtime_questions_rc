[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](LICENSE)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

# Realtime Questions RC

A full-stack, real-time question management system for events, presentations, and panels. Built with **Node.js/Express**, **PostgreSQL/Prisma**, **Astro/React**, and **Socket.IO** for instant updates and seamless moderation.

---

## 🚀 What the Project Does

- **Collects questions in real time** from users during live events
- **Moderation panel** for accepting, rejecting, and answering questions
- **Live presentation mode** to display accepted/answered questions
- **WebSocket-powered updates** for instant feedback
- **Multi-eje (topic) support** for organizing questions

---

## ✨ Key Features & Benefits

- **Fast, scalable backend** with PostgreSQL and Prisma ORM
- **Modern frontend** using Astro, React, and Tailwind CSS
- **Role-based panels** for users, moderators, and presenters
- **Secure, CORS-enabled API**
- **Easy local setup** for development and testing
- **Extensible architecture** for new features and integrations

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm (or yarn)

### 1. Clone the Repository
```bash
git clone https://github.com/Diego17cp/realtime_questions_rc.git
cd realtime_questions_rc
```

### 2. Backend Setup
```bash
cd backend
npm install
cp env copy .env # Edit .env for your DB credentials
npm run db:generate   # Generate Prisma client
npm run db:push       # Apply schema
npm run db:seed       # (Optional) Seed initial data
npm run dev           # Start backend (http://localhost:3000)
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev           # Start frontend (http://localhost:4321)
```

### 4. Environment Variables
- Backend: `.env` (see `backend/env copy`)
- Frontend: `.env` (see `frontend/env`)

### 5. Usage Example
- Open [http://localhost:4321](http://localhost:4321) in your browser
- Submit questions as a user
- Access moderator panel: `/moderator`
- View live presentation: `/moderator/presentation`

---

## 📚 Where to Get Help
- [setup.md](setup.md) — Step-by-step setup guide
- [backend/README.md](backend/README.md) — Backend details
- [frontend/README.md](frontend/README.md) — Frontend details
- [LICENSE](LICENSE) — License information
- For issues or questions, open an [Issue](https://github.com/Diego17cp/realtime_questions_rc/issues)

---

## 👥 Maintainers & Contributing
- Pull requests and issues welcome!

---

## 📝 Project Structure
```
realtime_questions_rc/
├── backend/    # Express, Prisma, PostgreSQL
├── frontend/   # Astro, React, Tailwind
├── setup.md    # Full setup instructions
├── LICENSE     # MIT License
```

---

## ⚡ Quick Links
- **Frontend:** [http://localhost:4321](http://localhost:4321)
- **Backend API:** [http://localhost:3000](http://localhost:3000)
- **Moderator Panel:** [http://localhost:4321/moderator](http://localhost:4321/moderator)
- **API Status:** [http://localhost:3000/api/status](http://localhost:3000/api/status)
- **API Ejes:** [http://localhost:3000/api/ejes](http://localhost:3000/api/ejes)

---

> For detailed API docs, see backend/README.md or future docs/ directory.