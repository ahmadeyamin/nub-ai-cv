# Laravel + Inertia.js Application

This is a full-stack web application built with **Laravel** as the backend and **Inertia.js** for the frontend, providing a modern SPA-like experience without building a separate API.

---

## 🧰 Tech Stack

- **Backend:** Laravel
- **Frontend:** Inertia.js
- **Frontend Framework:** React
- **Build Tool:** Vite
- **Database:** SQLite (default) / MySQL / PostgreSQL
- **Package Managers:** Composer, npm

---

## 📋 Requirements

Make sure the following are installed on the target computer:

- **PHP** >= 8.2
- **Composer** (latest)
- **Node.js** >= 20
- **npm** or **bun**
- **MySQL / PostgreSQL / SQLite**
- **Git**

Check versions:
```bash
php -v
composer -V
node -v
npm -v



------- Installation -------

## 🚀 Installation (Fresh Computer Setup)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### 2️⃣ Install Backend Dependencies

```bash
composer install
```

If you get permission issues:

```bash
composer install --ignore-platform-reqs
```

---

### 3️⃣ Install Frontend Dependencies

```bash
npm install
```

or

```bash
yarn install
```

---

### 4️⃣ Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

---

### 5️⃣ Configure Database

Edit `.env`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Create the database manually if needed.

---

### 6️⃣ Run Migrations & Seeders

```bash
php artisan migrate
```

Optional (if seeders exist):

```bash
php artisan db:seed
```

---

### 7️⃣ Build Frontend Assets

For development:

```bash
npm run dev
```

For production:

```bash
npm run build
```

---

### 8️⃣ Start the Application

Run Laravel server:

```bash
php artisan serve
```

Default URL:

```
http://127.0.0.1:8000
```









