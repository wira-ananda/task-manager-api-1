Berikut adalah penjelasan singkat mengenai alur kerja dua proyek milikmu, berdasarkan **teknologi (tech stack)** yang digunakan dan struktur umum proyek di repositori:

---

## 🔁 Alur Sistem Task Manager (Frontend + Backend)

### 🧠 **Tech Stack yang Digunakan**

#### 📦 Backend (task-manager-api-1)

* **Node.js + Express.js:** Untuk membuat RESTful API.
* **MongoDB + Mongoose (ODBM):** Menyimpan dan mengelola data dalam format dokumen.
* **Mongoose:** Untuk mempermudah definisi skema dan validasi antar koleksi MongoDB.

#### 🎨 Frontend (task-manager-ui)

* **React.js:** Untuk membangun antarmuka pengguna dinamis.
* **Ant Design (Antd):** Sebagai komponen UI yang siap pakai (form, modal, tabel).
* **Tailwind CSS:** Untuk styling yang fleksibel dan cepat.
* **React Router DOM:** Untuk routing antar halaman di aplikasi.

---

## ⚙️ **Alur Kerja Sistem Task Manager**

### 1. **User Akses Halaman dari React Frontend**

Saat user membuka aplikasi React:

* Halaman login/register akan ditampilkan.
* User akan melakukan proses register (bagi yang belum punya akun), atau login (bagi yang  sdh punya akun). Dan proses nya menggunakan Request data dari API `/api/auth/login` → login atau `/api/auth/register` → register
* Setelah login, token disimpan (di `localStorage` , ini akan memastikan user tdk perlu login lagi saat melakukan refresh halaman).
* Selanjutnya Akan ditampilkan list project yang dimiliki oleh user yang sedang login
* list project yang ditampilkan merupakan hasil request dari endpoint api `/api/projects/:project_id/users`
* user bisa membuka salah satu list project dan yang ada untuk melihat detail project yang di klik
* ketika sudah masuk didalam page Project Detail, maka detail project (termasuk Task dan User yang ada dalam project) akan ditampilkan
* semua yang ditampilkan halaman detail project merupakan hasil dari pemanggilan data dari beberapa api yang sudah kami buat, datanya diambil dari database nosql mongodb kami.
* Saat didalam halaman detail project, fitur utama bisa dijalankan, yaitu dapat menambah tugas/task untuk user tertentu
* menambah anggota baru berdasarkan user yang terdaftar di database nosql mongodb
* serta melakukan editing/update di beberapa bagian dalam project maupun task dalam project tersebut

### 2. **Permintaan Data ke Backend (API Call)**

Semua alur yang terlihat di User Interface yang sudah dijelaskan diatas merupakan hasil dari komunikasi dua arah antara Front-End (React JS), Back-End (Node JS), dan Database (MongoDB)


\- React menampilkan halaman → Data yang ada di halaman diminta ke Node JS, lalu Node JS bertugas mengambil data yang disimpan di MongoDB → Lalu MongoDB memberikan data sesuai dengan apa yang diminta oleh Node JS → Kemudian terakhir, Node JS pun memberikan data tersebut ke React JS → dan React JS menampilkannya ke halaman

Proses tersebut lah yang akan dilakukan secara berulang-ulang dalam project ini.
Dalam prosesnya pun React akan mengirim permintaan ke backend (`task-manager-api-1`) melalui endpoint seperti:

* `/api/auth/login` → login
* `/api/projects` → ambil daftar proyek
* `/api/projects/:id/tasks` → ambil tugas dalam suatu proyek

Permintaan dikirim melalui **`axios`**, dan menggunakan **JWT token** sebagai otorisasi (Authorization header) atau untuk memastikan apakah user yang terdaftar lah yang melakukan permintaan tersebut.

### 3. **Express Menerima dan Proses Permintaan**

* Endpoint REST menerima request.
* Express memproses request berdasarkan route dan controller.
* Mongoose akan mengakses database MongoDB berdasarkan model:

  * `User`, `Project`, `Task`, `Comment`, `ProjectUser`, dll.

Contoh:

```js
Task.find({ project_id: req.params.id })
```

### 4. **MongoDB Simpan & Ambil Data**

* MongoDB menyimpan dokumen JSON dalam koleksi (`tasks`, `projects`, dll).
* Dengan bantuan Mongoose, semua operasi CRUD dijalankan secara efisien.

---

## 🧭 Contoh Alur Fitur Tambah Task

1. User klik "Tambah Task" di frontend.
2. React tampilkan modal input (Antd Modal + Form).
3. Setelah user submit:

   * Axios mengirim data ke `POST /api/projects/:id/tasks`
4. Backend menerima data → Validasi → Simpan ke MongoDB.
5. Setelah sukses, frontend update UI tanpa reload.

---

## 🗂 Struktur API dan Komponen Frontend

### Backend (API)

* `routes/`: Menangani endpoint (`auth`, `projects`, `tasks`, dll).
* `controllers/`: Logika utama proses data.
* `models/`: Skema data Mongoose (`User.js`, `Task.js`, dll).
* `middleware/`: Seperti `authMiddleware.js` untuk cek JWT.

### Frontend

* `pages/`: Halaman utama seperti `LoginPage`, `ProjectDetailPage`, dll.
* `components/`: Reusable UI seperti `TaskListComponent`, `Navbar`, dsb.
* `hooks/api/`: Hook React Query custom seperti `useGetProjectTasks`.

---

## ✅ Ringkasan Alur Sistem

| Tahapan               | Komponen / Tools              |
| --------------------- | ----------------------------- |
| UI & Event Handling   | React + Ant Design + Tailwind |
| Routing UI            | React Router DOM              |
| Data Fetching         | Axios + React Query           |
| Backend API           | Express.js + Node.js          |
| Data Modeling         | MongoDB + Mongoose            |
| Auth / Validasi Akses | JWT + Middleware Express      |
