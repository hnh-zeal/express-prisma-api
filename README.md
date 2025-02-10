# Express Prisma API

A lightweight and scalable REST API boilerplate built with **Express.js** and **Prisma ORM**. This project serves as a foundation for developing modern Node.js applications with database support.

## 🚀 Features

- Express.js for backend routing
- Prisma ORM for database management
- PostgreSQL/MySQL/SQLite support
- Environment-based configuration
- Easy-to-extend modular structure
- API error handling and validation

## 📦 Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **Prisma** - Type-safe database ORM
- **PostgreSQL** (or any Prisma-supported DB)

---

## 🔧 Installation & Setup

### 1️⃣ Clone the repository

```sh
git clone https://github.com/hnh-zeal/express-prisma-api.git
cd express-prisma-api
```

### 2️⃣ Install dependencies
```sh
yarn
```

### 3️⃣ Configure environment variables
Create a .env file in the root directory and define the following variables:
```.env
DATABASE_URL="postgresql://user:password@localhost:5432/db_name"
PORT=3000
```

### 4️⃣ Apply database migrations
Run the following Prisma commands:
```sh
npx prisma migrate dev --name init
npx prisma generate
```

### 5️⃣ Start the server
```sh
yarn dev
```
Your API should now be running at http://localhost:3000.

## 📌 API Endpoints

| Method | Endpoint       | Description         |
|--------|--------------|---------------------|
| GET    | `/api/users` | Fetch all users     |
| POST   | `/api/users` | Create a new user   |
| GET    | `/api/users/:id` | Get a user by ID |
| PUT    | `/api/users/:id` | Update user      |
| DELETE | `/api/users/:id` | Delete user      |

---

## 🛠 Development Commands

| Command            | Description                      |
|--------------------|--------------------------------|
| `npm run dev`     | Run the app in development mode |
| `npm run build`   | Build the project for production |
| `npm start`       | Start the app in production     |
| `npx prisma studio` | Open Prisma Studio GUI        |

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo, create a branch, and submit a pull request.

---

## 📜 License

This project is licensed under the **MIT License**.

---

### 👨‍💻 Author

Developed by **[hnh-zeal](https://github.com/hnh-zeal)** 🚀




