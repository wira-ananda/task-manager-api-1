# 📦 Struktur Folder - Express Task Manager

Berikut adalah struktur folder dari aplikasi Express.js berbasis task manager:

```
project-root/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── projectController.js
│   ├── projectUserController.js
│   ├── taskController.js
│   ├── userController.js
│   └── userProjectProgressController.js
├── middlewares/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models/
│   ├── Project.js
│   ├── ProjectUser.js
│   ├── Task.js
│   ├── User.js
│   └── UserProjectProgress.js
├── node_modules/
├── routes/
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   ├── projectUserRoutes.js
│   ├── taskRoutes.js
│   └── userRoutes.js
├── utils/
│   └── calculateProgress.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## 📘 Penjelasan Singkat

| Folder / File                  | Fungsi Utama                                                       |
|-------------------------------|---------------------------------------------------------------------|
| `config/`                     | Konfigurasi database dan koneksi                                   |
| `controllers/`                | Logika bisnis untuk masing-masing resource                         |
| `middlewares/`                | Middleware seperti autentikasi dan error handling                  |
| `models/`                     | Schema mongoose untuk setiap entitas                               |
| `routes/`                     | Routing API terpisah per entitas                                   |
| `utils/`                      | Fungsi utilitas seperti perhitungan progres                        |
| `.env`                        | Variabel lingkungan seperti `PORT`, `DB_URI`, dsb.                 |
| `server.js`                   | Entry point aplikasi                                               |

---

> Dibuat untuk proyek **Task Manager dengan Express.js & MongoDB**