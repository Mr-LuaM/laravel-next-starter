# Laravel + Next.js Starter

## 🚀 Description
This repository is a **full-stack boilerplate** using **Laravel 11 (API backend)** and **Next.js 15.1 (React frontend)**. It provides a clean, scalable, and DRY (Don't Repeat Yourself) architecture for building modern web applications with a Laravel-powered backend and a Next.js-powered frontend.

## 🏗️ Stack & Features
- **Backend:** Laravel 11 (API-first architecture)
- **Frontend:** Next.js 15.1 (React, Tailwind CSS, ShadCN/UI)
- **Authentication:** Laravel Sanctum (API token-based auth)
- **Database:** MySQL/PostgreSQL (Eloquent ORM)
- **State Management:** React Query (for API fetching & caching)
- **Component Library:** ShadCN/UI (for UI elements)
- **API Requests:** Axios
- **Form Handling:** React Hook Form + Zod (Validation)
- **Authorization:** Spatie Role Permissions (optional)

---

## 🛠️ Installation & Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Mr-LuaM/laravel-next-starter.git
cd laravel-next-starter
```

### 2️⃣ Backend (Laravel 11 Setup)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```
- Configure your **`.env`** file (Database, Sanctum, etc.)
- Run migrations:
```bash
php artisan migrate --seed
```
- Start Laravel Server:
```bash
php artisan serve
```

### 3️⃣ Frontend (Next.js 15.1 Setup)
```bash
cd ../frontend
npm install
cp .env.example .env.local
```
- Configure your **`.env.local`** file (API URL)
- Run Next.js Development Server:
```bash
npm run dev
```

---

## 🌍 API & Frontend Connection
By default, the **frontend fetches data from Laravel's API** (set in `.env.local`).
- **API Base URL:** `http://localhost:8000/api`
- **Frontend Running on:** `http://localhost:3000`
- **Authentication:** Laravel Sanctum (stored in HTTP-only cookies)

---

## 🔧 Project Structure
```
laravel-next-starter/
 ├── backend/   # Laravel 11 Backend (API & Database)
 ├── frontend/  # Next.js 15.1 Frontend (React UI)
```
- **Backend (`backend/`)**
  - `routes/api.php` → API Routes
  - `app/Models/` → Database Models
  - `app/Http/Controllers/` → API Controllers
- **Frontend (`frontend/`)**
  - `pages/` → Next.js Pages
  - `components/` → UI Components (ShadCN/UI)
  - `utils/api.js` → API Requests (Axios)
  - `store/` → React Query State Management

---

## 📌 Notes
- Uses **Sanctum Authentication** (Make sure CORS & CSRF are handled correctly).
- Uses **Tailwind CSS & ShadCN** for UI design.
- Uses **React Query** for optimized API calls.

### ✅ Ready to build your next project? Let’s go! 🚀

