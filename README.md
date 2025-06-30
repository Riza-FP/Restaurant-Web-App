# 🍽️ Restaurant Web App (Next.js + PostgreSQL + Docker)

This is a full-stack restaurant management web app with login authentication, menu and order management, and PostgreSQL as the database — all running on top of **Next.js App Router**.

---

## 🚀 Features

- 🔐 **Admin Login System**
  - User data stored securely in PostgreSQL
  - Redirects to protected pages only after login

- 🧾 **Menu Management**
  - Add, edit, delete food items
  - Stored in PostgreSQL, editable via dashboard

- 🛒 **Order Tracking**
  - Displays orders with item breakdown and timestamps
  - Clear all orders with one click

- ✅ **Access Control**
  - Redirects unauthorized access from `/orders` to `/login`
  - Remembers redirect path after login

- 🐳 **Dockerized PostgreSQL**
  - PostgreSQL runs in Docker using `docker-compose`
  - Data persists in local volume

---

## 📂 Tech Stack

- **Frontend:** Next.js 14 (App Router)
- **Backend:** Node.js API Routes via Next.js
- **Database:** PostgreSQL in Docker
- **Styling:** CSS Modules
- **Auth:** LocalStorage-based login (demo mode)

---

## 🧑‍💻 How to Run Locally

### 1. 📦 Install Dependencies

```bash
npm install
```

### 2. 🐳 Start PostgreSQL in Docker

```bash
docker compose up -d
```

This spins up PostgreSQL with:
- `DB name`: `restaurantdb`
- `User`: `myuser`
- `Password`: `mypassword`

> See `docker-compose.yml` for details.

### 3. 🌐 Start the Dev Server

```bash
npm run dev
```

Then visit:  
👉 `http://localhost:3000/login`
For Admin Access and Orders Page

👉 `http://localhost:3000/`
To Menu Page

---

## 🔐 Default Admin Login

| Email               | Password   |
|---------------------|------------|
| `riza@example.com`  | `rizafp12` |

---

## 📁 Project Structure (Important Files)

```
restaurant-web/
├── app/
│   ├── login/
│   ├── menu/
│   ├── orders/
│   └── api/
│       ├── login/
│       ├── products/
│       └── orders/
├── lib/db.js        # PostgreSQL connection
├── docker-compose.yml
├── package.json
├── .gitignore
└── README.md
```
