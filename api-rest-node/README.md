# ⚙️ Backend — Tech Pulse Blog API (Node.js + Express + MongoDB)

## Descripción (ES)
Este directorio contiene la **API REST** del proyecto *Tech Pulse Blog*. Expone endpoints para CRUD de artículos, subida de imágenes, listados recientes y búsqueda.

### Requisitos
- Node.js >= 18
- MongoDB local o Atlas

### Variables de entorno
Crea `./.env` (no lo subas al repo):
```bash
PORT=3900
MONGO_URI=mongodb://localhost:27017/mc_blog
CORS_ORIGIN=http://localhost:5173
```

### Instalación y ejecución
```bash
npm install
npm start   # nodemon index.js (desarrollo)
```
> Para producción puedes usar `node index.js` (añade un script "start" si lo prefieres).

### Endpoints principales
- `POST /api/create`
- `GET /api/posts`
- `GET /api/posts/:last`
- `GET /api/post/:id`
- `PUT /api/post/:id`
- `DELETE /api/post/:id`
- `POST /api/upload-image/:id`
- `GET /api/image/:file`
- `GET /api/search/:search`

### Enlace
Consulta documentación completa en el [README principal](../README.md).

---

## Description (EN)
This directory contains the **REST API** for *Tech Pulse Blog*. It exposes endpoints for posts CRUD, image uploads, recent posts and search.

### Requirements
- Node.js >= 18
- MongoDB (local or Atlas)

### Environment Variables
Create `./.env` (do not commit):
```bash
PORT=3900
MONGO_URI=mongodb://localhost:27017/mc_blog
CORS_ORIGIN=http://localhost:5173
```

### Install & Run
```bash
npm install
npm start   # nodemon index.js (development)
```
> For production you can use `node index.js` (add a "start" script if preferred).

### Main Endpoints
- `POST /api/create`
- `GET /api/posts`
- `GET /api/posts/:last`
- `GET /api/post/:id`
- `PUT /api/post/:id`
- `DELETE /api/post/:id`
- `POST /api/upload-image/:id`
- `GET /api/image/:file`
- `GET /api/search/:search`

### Link
See the full documentation in the [root README](../README.md).
