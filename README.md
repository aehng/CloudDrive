# CloudDrive

CloudDrive is a web-based file drive application: users can create folders, upload files, browse and download their files. It uses a Django backend (Django REST Framework present for API helpers) and a Vite + React frontend for the client.

---

## Quick summary
- **Backend:** Django 4.2.4 (Poetry-managed — see `pyproject.toml`)  
- **Frontend:** Vite + React in `client/`  
- **Features:** user-auth-protected pages, folder model, file uploads, file download endpoints  
- **Default DB (dev):** SQLite

---

## Table of contents
- [Prerequisites](#prerequisites)
- [Quickstart (development)](#quickstart-development)
- [Running the app](#running-the-app)
- [API endpoints](#api-endpoints)
- [Project structure](#project-structure)
- [Environment variables](#environment-variables)
- [Frontend: run & build](#frontend-run--build)
- [Testing & linting](#testing--linting)
- [Deployment recommendations](#deployment-recommendations)
- [Security notes](#security-notes)
- [Contributing & license](#contributing--license)

---

## Prerequisites
- Python 3.10 (pyproject specifies `^3.10`)
- Poetry
- Node.js 16+ and npm (or yarn)

---

## Quickstart (development)
Clone, install dependencies, create an `.env`, then run backend and frontend:

```bash
git clone https://github.com/aehng/CloudDrive.git
cd CloudDrive

# Python dependencies and environment
poetry install
poetry shell

# Frontend dependencies
cd client
npm install
cd ..

# Create backend env (edit values in _server/.env)
cp _server/.env.example _server/.env

# Start servers (in two terminals)
# Terminal A: frontend (Vite)
cd client
npm run dev

# Terminal B: backend (Django)
cd _server
python manage.py migrate
python manage.py runserver
```

Open http://localhost:8000. Most pages require authentication.

---

## Running the app
- Frontend dev server (HMR): `cd client && npm run dev`  
- Backend dev server: `cd _server && python manage.py runserver`  
- Build frontend for production: `cd client && npm run build`  
- Collect static files (Django): `python manage.py collectstatic --noinput`

---

## API endpoints
(implemented in `_server/core/urls.py` and `_server/core/views.py`)

- `GET /`  
  Index page (login required). In production this renders built frontend assets using the Vite manifest.

- `GET /folders/`  
  Return JSON list of folders for current user.

- `POST /folders/`  
  Create a new folder for current user. JSON body:
  ```json
  { "title": "My Folder" }
  ```

- `GET /files/<id>/`  
  Return files for folder with id `<id>`. If the folder is not found, returns all files for the user.

- `POST /api/upload/<folder_id>/`  
  Upload a file as multipart/form-data. Field name: `file`. If `folder_id` is missing/0, the file will be saved without a folder.

  Example using curl (assumes logged-in session cookies or other auth):
  ```bash
  curl -F "file=@/path/to/file.txt" -b cookiejar -c cookiejar http://localhost:8000/api/upload/1/
  ```

- `GET /api/download/<file_id>/`  
  Download the file with id `<file_id>` (login required). Returns file attachment.

---

## Project structure
- `_server/` — Django backend
  - `manage.py`
  - `_server/` — Django project settings
  - `core/` — main app (models: Folder, File; views: index, folders, files, file_upload, file_download)
  - `registration/` — auth / sign-in pages
  - `uploads/` — file upload handlers (if present)
  - `_server/.env.example` — environment template
- `client/` — Vite + React frontend
  - `client/src/` — React source
  - `client/index.html`, `client/vite.config.js`
  - `client/package.json` — scripts: `dev`, `build`, `preview`, `lint`
- `pyproject.toml` — Poetry configuration
- `poetry.lock` — locked Python deps

---

## Environment variables
Copy `_server/.env.example` to `_server/.env` and set values there. Typical keys you should configure:

```
DJANGO_SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3     # or postgres://user:pass@host:port/dbname
ALLOWED_HOSTS=localhost,127.0.0.1
# Add storage/email provider keys as needed
```

Do not commit real secrets. Use environment variables or a secrets manager in production.

---

## Frontend: run & build
- Dev (HMR): `cd client && npm run dev`  
- Build production assets: `cd client && npm run build`  
- Preview built assets: `cd client && npm run preview`  

Note: In production the backend attempts to read `core/static/manifest.json` (created by the frontend build) to serve the correct JS/CSS filenames.

---

## Testing & linting
- Backend tests: `cd _server && python manage.py test`  
- Frontend lint: `cd client && npm run lint`  

Consider adding Python linters/formatters (black, ruff) to `pyproject.toml` and a CI workflow.

---

## Deployment recommendations
- Use a production DB (e.g., Postgres) — set via `DATABASE_URL`.  
- Use object storage (S3) or a shared persistent storage for uploaded files; configure Django storage backend.  
- Build frontend assets and serve them via Django staticfiles or a CDN; ensure `core/static/manifest.json` exists.  
- Serve Django with Gunicorn/Uvicorn behind nginx and enable HTTPS.  
- Set `DEBUG=False`, configure `ALLOWED_HOSTS`, and secure cookies.  
- Store secrets in a vault or environment variables — never in repo.

---

## Security notes (urgent)
- Current settings file contains a hard-coded `SECRET_KEY` and `DEBUG = True` (development defaults). Before any public deployment:
  - Remove hard-coded keys and source them from `_server/.env`.
  - Set `DEBUG=False`.
  - Configure `ALLOWED_HOSTS`.
  - Use HTTPS and secure cookie settings.
