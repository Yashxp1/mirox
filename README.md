# 🚀 CrewSpace

CrewSpace is a **modern project management tool** built to help teams collaborate, organise their work, and track tasks efficiently, all in one place.

---

## 🧠 Overview

CrewSpace allows users to **create workspaces**, **invite members**, assign them roles, and manage **tasks** with priorities, statuses, and target deadlines.  
The goal of this project is to create a simple yet powerful platform for seamless teamwork and productivity.

---

## 🎥 Demo Video

> [📺 Watch on YouTube](#)  


---

## 🖼️ Screenshots

><img width="1919" height="864" alt="image" src="https://github.com/user-attachments/assets/ce7e81e6-1a13-4e51-bdaf-d29745d30ff9" />

> <img width="1919" height="867" alt="image" src="https://github.com/user-attachments/assets/19ab835e-fef9-4ecd-9d5d-a92f6300e612" />


---

## ⚙️ Features

- 🏗️ Create and manage **Workspaces**
- 👥 Invite **Members** and assign **Roles**
- 🧾 Create and update **Tasks**
- 🔖 Set **Priority**, **Status**, and **Target Dates**
- 🧭 Clean and responsive UI
- 🔐 Authentication & Authorization with **Auth.js**
- ⚡ Blazing-fast client with **TanStack Query**
- 💾 Scalable backend using **Prisma** and **PostgreSQL**

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | Next.js, TypeScript, Tailwind CSS |
| **Backend** | Next.js (API Routes), Prisma |
| **Database** | PostgreSQL |
| **Auth** | Auth.js |
| **State/Data** | TanStack Query |
| **Deployment** | Vercel |

---

## 🚀 Getting Started

```bash
# 1️⃣ Clone the Repository
git clone https://github.com/Yashxp1/crewspace.git
cd crewspace

# 2️⃣ Install Dependencies
npm install

# 3️⃣ Set Up Environment Variables
# Create a .env file in the root directory and add the following:
# ---------------------------------------------------------------
# DATABASE_URL=your_postgres_database_url
# NEXTAUTH_SECRET=your_auth_secret
# NEXTAUTH_URL=http://localhost:3000
# ---------------------------------------------------------------

# 4️⃣ Run Prisma Migrations
npx prisma migrate dev

# 5️⃣ Start the Development Server
npm run dev

# 6️⃣ Open the App
# Visit http://localhost:3000 in your browser

