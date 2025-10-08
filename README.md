# 📰 Tech Pulse Blog – React + Node.js + MongoDB
_Aplicación de blog full‑stack: Frontend con React/Vite y API REST con Node.js + MongoDB_

---

## 📑 Índice (ES)
- [Descripción](#-descripción)
- [Estructura](#-estructura)
- [Requisitos](#-requisitos)
- [Variables de entorno](#-variables-de-entorno)
- [Instalación y ejecución](#-instalación-y-ejecución)
- [Scripts](#-scripts)
- [Endpoints principales](#-endpoints-principales)
- [Tecnologías](#-tecnologías)
- [Solución de problemas](#-solución-de-problemas)
- [Autor](#-autor)
- [Licencia](#-licencia)

---

## 🧾 Descripción
Proyecto **técnico** de blog full‑stack. El **frontend** (React 18 + Vite) consume la **API REST** (Node.js + Express + MongoDB). Permite **crear, editar, listar, buscar y eliminar** artículos, **subir imágenes** y obtener listados de artículos recientes.

---

## 📁 Estructura
```bash
react-blog/
├─ api-rest-node/         # Backend (Node/Express + MongoDB)
└─ tech-pulse-blog/       # Frontend (React + Vite)
```
> Este README pertenece a la **raíz** del monorepo. Los README de cada parte están en:  
> - `api-rest-node/README.md` (API)  
> - `tech-pulse-blog/README.md` (Frontend)

---

## ⚙️ Requisitos
- **Node.js >= 18 (LTS)**  
- Gestor de paquetes: **npm / pnpm / yarn**  
- **MongoDB** (local o Atlas)

---

## 🔐 Variables de entorno
Crea archivos `.env` **en cada subproyecto**. **No los subas** al repositorio.

### Backend — `api-rest-node/.env.example`
```bash
PORT=3900
MONGO_URI=mongodb://localhost:27017/mc_blog
CORS_ORIGIN=http://localhost:5173
```

### Frontend — `tech-pulse-blog/.env.example`
```bash
VITE_API_URL=http://localhost:3900/api/
```
> El frontend también define la URL en `src/helpers/Global.jsx`. Puedes migrarlo a `import.meta.env.VITE_API_URL` si lo prefieres.

---

## 🚀 Instalación y ejecución
Desde la **raíz** del repositorio:
```bash
# 1) Instalar dependencias
npm --prefix tech-pulse-blog install
npm --prefix api-rest-node   install

# 2) (Opcional) Instalar 'concurrently' en la raíz para orquestar ambos
npm install -D concurrently

# 3) Crear los .env a partir de los .env.example

# 4) Ejecutar ambos en desarrollo
npm run dev
```
> También puedes ejecutar cada servicio por separado desde su carpeta con `npm run dev` (front) y `npm start` (back, nodemon).

---

## 📜 Scripts
Guarda este `package.json` en la **raíz**:
```json
{
  "private": true,
  "scripts": {
    "dev": "concurrently \"npm:dev:client\" \"npm:dev:server\"",
    "dev:client": "npm --prefix tech-pulse-blog run dev",
    "dev:server": "npm --prefix api-rest-node run start",
    "build": "npm --prefix tech-pulse-blog run build",
    "start": "npm --prefix api-rest-node run start"
  },
  "devDependencies": {
    "concurrently": "^9.0.0"
  }
}
```

---

## 📡 Endpoints principales
**Base URL:** `http://localhost:3900/api/`

- `POST /create` — Crear artículo  
- `GET /posts` — Listar artículos  
- `GET /posts/:last` — Últimos artículos  
- `GET /post/:id` — Obtener artículo  
- `PUT /post/:id` — Actualizar artículo  
- `DELETE /post/:id` — Eliminar artículo  
- `POST /upload-image/:id` — Subir imagen del artículo  
- `GET /image/:file` — Servir imagen  
- `GET /search/:search` — Buscar artículos

---

## 🧩 Tecnologías
**Frontend:** React 18, Vite, React Router, DOMPurify, Marked, SweetAlert2  
**Backend:** Node.js, Express, MongoDB/Mongoose, Multer, Validator, CORS, Nodemon

---

## 🛠️ Solución de problemas
- **CORS**: ajusta `CORS_ORIGIN` y la configuración de `cors()` en el backend.  
- **Rutas de imágenes**: verifica que existan y estén ignoradas en Git (`api-rest-node/src/images` o `uploads`).  
- **URL API**: alinea `VITE_API_URL` y `src/helpers/Global.jsx`.  
- **MongoDB**: si usas Atlas, actualiza `MONGO_URI` y abre IPs en la red de Atlas.

---

## 👤 Autor
**Marta Camp** — GitHub: https://github.com/Mewmewtty

---

## 📝 Licencia
MIT

---

# 📰 Tech Pulse Blog – React + Node.js + MongoDB
_Full‑stack blog app: React/Vite frontend + Node.js REST API + MongoDB_

---

## 📑 Table of Contents (EN)
- [Description](#description)
- [Structure](#structure)
- [Requirements](#requirements)
- [Environment Variables](#environment-variables)
- [Install & Run](#install--run)
- [Scripts](#scripts-1)
- [Main API Endpoints](#main-api-endpoints)
- [Tech Stack](#tech-stack)
- [Troubleshooting](#troubleshooting)
- [Author](#author)
- [License](#license)

---

## Description
Technical full‑stack blog app. The **frontend** (React 18 + Vite) consumes the **REST API** (Node.js + Express + MongoDB). It supports **create, edit, list, search and delete** posts, **image uploads**, and listing **recent posts**.

---

## Structure
```bash
react-blog/
├─ api-rest-node/         # Backend (Node/Express + MongoDB)
└─ tech-pulse-blog/       # Frontend (React + Vite)
```
> This README lives at the **repository root**. Per‑package READMEs:  
> - `api-rest-node/README.md` (API)  
> - `tech-pulse-blog/README.md` (Frontend)

---

## Requirements
- **Node.js >= 18 (LTS)**  
- Package manager: **npm / pnpm / yarn**  
- **MongoDB** (local or Atlas)

---

## Environment Variables
Create `.env` files **in each subproject**. **Do not commit** them.

### Backend — `api-rest-node/.env.example`
```bash
PORT=3900
MONGO_URI=mongodb://localhost:27017/mc_blog
CORS_ORIGIN=http://localhost:5173
```

### Frontend — `tech-pulse-blog/.env.example`
```bash
VITE_API_URL=http://localhost:3900/api/
```
> The frontend also defines the URL in `src/helpers/Global.jsx`. You can refactor to `import.meta.env.VITE_API_URL` if preferred.

---

## Install & Run
From the **repository root**:
```bash
# 1) Install dependencies
npm --prefix tech-pulse-blog install
npm --prefix api-rest-node   install

# 2) (Optional) Install 'concurrently' at the root
npm install -D concurrently

# 3) Create .env files based on .env.example

# 4) Run both in development
npm run dev
```
> You can also run each service separately: `npm run dev` (front) and `npm start` (back, nodemon).

---

## Scripts
Place this `package.json` at the **root**:
```json
{
  "private": true,
  "scripts": {
    "dev": "concurrently \"npm:dev:client\" \"npm:dev:server\"",
    "dev:client": "npm --prefix tech-pulse-blog run dev",
    "dev:server": "npm --prefix api-rest-node run start",
    "build": "npm --prefix tech-pulse-blog run build",
    "start": "npm --prefix api-rest-node run start"
  },
  "devDependencies": {
    "concurrently": "^9.0.0"
  }
}
```

---

## Main API Endpoints
**Base URL:** `http://localhost:3900/api/`

- `POST /create` — Create post  
- `GET /posts` — List posts  
- `GET /posts/:last` — Latest posts  
- `GET /post/:id` — Get post  
- `PUT /post/:id` — Update post  
- `DELETE /post/:id` — Delete post  
- `POST /upload-image/:id` — Upload image  
- `GET /image/:file` — Serve image  
- `GET /search/:search` — Search posts

---

## Tech Stack
**Frontend:** React 18, Vite, React Router, DOMPurify, Marked, SweetAlert2  
**Backend:** Node.js, Express, MongoDB/Mongoose, Multer, Validator, CORS, Nodemon

---

## Troubleshooting
- **CORS**: adjust `CORS_ORIGIN` and `cors()` configuration.  
- **Image paths**: ensure folders exist and are Git‑ignored (`api-rest-node/src/images` or `uploads`).  
- **API URL**: align `VITE_API_URL` and `src/helpers/Global.jsx`.  
- **MongoDB**: for Atlas, update `MONGO_URI` and whitelist IPs.

---

## Author
**Marta Camp** — GitHub: https://github.com/Mewmewtty

---

## License
MIT
