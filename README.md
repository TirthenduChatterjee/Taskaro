# 🚀 Taskaro — Fullstack Task Management App

**Taskaro** is a powerful and elegant task management tool. Designed with a modern UI and robust backend, it helps users track, manage, and organize tasks with ease.

🌐 **Live Site**: [https://taskaroapp.netlify.app](https://taskaroapp.netlify.app)

---
## 🧰 Tech Stack

### 🖼️ Frontend
- ⚛️ **React**
- 📦 **Redux Toolkit**
- 🧭 **React Router**
- 🎨 **Tailwind CSS**
- 🌐 **Axios**

### 🛠️ Backend
- 🟢 **Node.js**
- 🚂 **Express.js**
- 🍃 **MongoDB + Mongoose**
- 🔐 **JWT Authentication**

---

---

## 📸 Features Showcase

### 🔐 Authentication

- Secure login and signup
- JWT-based authorization

**Login Screen**  
![Login](https://github.com/TirthenduChatterjee/Taskaro/blob/main/taskaro-client/screenshots/Login.png?raw=true)

**Sign Up**  
![Sign Up](https://github.com/TirthenduChatterjee/Taskaro/blob/main/taskaro-client/screenshots/SignUp.png?raw=true)

---

### 🧾 Task Management

- Add, Edit, and Delete tasks
- Task calendar support with due dates

**Add Task**  
![Add Task](https://github.com/TirthenduChatterjee/Taskaro/blob/main/taskaro-client/screenshots/Add%20Task.png?raw=true)

**Edit Task**  
![Edit Task](https://github.com/TirthenduChatterjee/Taskaro/blob/main/taskaro-client/screenshots/Edit%20Task.png?raw=true)

**Delete Task**  
![Delete Task](https://github.com/TirthenduChatterjee/Taskaro/blob/main/taskaro-client/screenshots/Delete%20Task.png?raw=true)

**Task Calendar**  
![Task Calendar](https://github.com/TirthenduChatterjee/Taskaro/blob/main/taskaro-client/screenshots/Task%20Calender.png?raw=true)

---

### 📅 Task Views

- View all tasks
- View only today's tasks

**All Tasks View**  
![All Tasks](https://github.com/TirthenduChatterjee/Taskaro/blob/main/taskaro-client/screenshots/All%20Task.png?raw=true)

**Today's Task View**  
![Today's Task](https://github.com/TirthenduChatterjee/Taskaro/blob/main/taskaro-client/screenshots/Today's%20Task.png?raw=true)

---

### 🎯 Filtering and Sorting

- Filter by task status (completed, pending, etc.)
- Sort tasks by name, date, or priority

**Filter by Status**  
![Filter](https://github.com/TirthenduChatterjee/Taskaro/blob/main/taskaro-client/screenshots/Filter%20by%20Status.png?raw=true)

**Sort Functionality**  
![Sort](https://github.com/TirthenduChatterjee/Taskaro/blob/main/taskaro-client/screenshots/Sort%20Functionality.png?raw=true)

---

### 🌙 Light and Dark Mode

- Automatically adapts to system theme
- Manual toggle available

**Light Theme**  
![Light Theme](https://github.com/TirthenduChatterjee/Taskaro/blob/main/taskaro-client/screenshots/Light%20Theme.png?raw=true)


## ⚙️ Run Locally

### 📁 Backend Setup

```bash
cd server
npm install
npm run dev
```
  ### 🌱 Environment Variables for Backend (`/server/.env`)

```env
PORT=5000
MONGO_URI=your-mongo-db-uri
JWT_SECRET=your-jwt-secret
```
### 📁 Frontend Setup

```bash
cd taskaro-client
npm install
npm run dev
```
  ### 🌱 Frontend Environment Variables (`/taskaro-client/.env`)

Create a `.env` file inside your `taskaro-client` directory and add the following:

```env
VITE_BASE_URL=http://localhost:5000
```
