# 🏫 School Management System

A modern and responsive **School Management System** built using **React (Vite)**, **Supabase**, and **Material UI (Berry Template)**.
It helps schools efficiently manage students, admissions, teachers, departments, and class data with real-time database integration.

---

## 🚀 Tech Stack

| Category         | Technology                                  |
| ---------------- | ------------------------------------------- |
| Frontend         | React + Vite                                |
| UI Library       | Material UI (Berry Template)                |
| Backend / DB     | Supabase (PostgreSQL + Auth)                |
| State Management | React Hook Form + Context / Redux (if used) |
| Deployment       | Vercel                                      |
| Authentication   | Supabase Auth                               |
| Version Control  | Git & GitHub                                |

---

## 📂 Folder Structure

```
src/
 ├── components/        # Reusable UI Components
 ├── layout/            # App Layout (Header, Sidebar, Breadcrumbs)
 ├── menu-items/        # Sidebar Menu Configuration
 ├── pages/ or views/   # Feature pages (Students, Teachers, Admissions)
 ├── services/          # Supabase client & API helpers
 ├── utils/             # Helper functions
 ├── assets/            # Images, icons, and static files
 ├── App.jsx
 └── main.jsx
```

---

## ⚙️ Features

✅ **Authentication System** (Login / Logout using Supabase)
✅ **Role-based Access** (Admin, Teacher, Student)
✅ **Student Management** (Add, View, Edit, Delete students)
✅ **Admission Module** (New admission tracking)
✅ **Class & Section Management**
✅ **Department Management**
✅ **Dynamic Breadcrumbs** using Berry template
✅ **Responsive Dashboard**
✅ **DataGrid Tables** for clean data visualization
✅ **Deployed on Vercel**

---

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/school-management-system.git
cd school-management-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Supabase

- Create a [Supabase](https://supabase.com) project
- Copy your project URL and anon key
- Create `.env` file in root and add:

  ```bash
  VITE_SUPABASE_URL=your_supabase_url
  VITE_SUPABASE_ANON_KEY=your_supabase_key
  ```

### 4. Run the project

```bash
npm run dev
```

---

## 🧮 Database Tables (Supabase)

| Table Name    | Description                                |
| ------------- | ------------------------------------------ |
| `students`    | Stores student personal & academic details |
| `admissions`  | Handles new admission requests             |
| `departments` | Department and faculty info                |
| `classes`     | Class and section info                     |
| `teachers`    | Teacher profiles and subjects              |

Each table uses **Row Level Security (RLS)** with proper **policies** for secure CRUD operations.

---

## 🖥️ Deployment

You can easily deploy this project on **Vercel**:

```bash
npm i -g vercel
vercel
```

Then follow on-screen instructions to deploy your live project.

---

## 📸 Screenshots (optional)

_Add screenshots or dashboard preview here_
Example:

```
📷 Dashboard Page
📷 Student List Page
📷 Add New Student Form
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open a PR or issue on this repository.

---

## 📜 License

This project is **Open Source** under the [MIT License](LICENSE).

---

## 👨‍💻 Developed By

**Mohammad Farhan**
Frontend Developer | MERN Stack Enthusiast
🌐 [Portfolio](#) | 💼 [LinkedIn](#) | 🐙 [GitHub](https://github.com/Dev-Farhan)
