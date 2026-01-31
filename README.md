# CloudDrive

A starter project combining a Django backend and a Vite-powered frontend (React). Use this repository as a starting point to build a cloud-storage-style application (or any hybrid MPA/SPAs) with an API-driven Django server and a modern JavaScript frontend served by Vite during development.

## Key features
- Django backend for API, authentication, and server-side pages
- Vite + React frontend in the `client` directory
- Clear separation of server (`_server`) and client (`client`) code
- Uses Poetry for Python dependency management

## Repository layout
- `_server/` — Django project and Python backend
- `client/` — Vite + React frontend
- `pyproject.toml` — Python project configuration (Poetry)
- `poetry.lock` — Locked Python dependencies

## Prerequisites
- Python 3.11 (or compatible; update `pyproject.toml` if using another Python version)
- Poetry (for Python dependency management)
- Node.js (16+ recommended) and npm or yarn

## Initial setup
1. Clone the repository:
   git clone https://github.com/aehng/CloudDrive.git
2. (Optional) Update the project name in `pyproject.toml` if you fork/rename the project.
3. Install Python dependencies:
   poetry install
4. Install frontend dependencies:
   cd client
   npm install
   cd ..
5. Create environment file for the Django server:
   - In `_server/` create `.env`
   - Copy the contents from `_server/.env.example` into `_server/.env` and fill in any required values
6. Activate the Poetry environment:
   poetry shell
7. Run Django migrations:
   cd _server
   python manage.py migrate

## Running the application (development)
- Start the frontend dev server (in a separate terminal):
  cd client
  npm run dev
- Start the Django dev server (with Poetry env active):
  cd _server
  python manage.py runserver
- Open your browser at: http://localhost:8000

The Vite dev server will serve frontend assets and support HMR; Django serves the backend/API and server-side pages.

## Environment variables
See `_server/.env.example` for the list of environment variables used by the Django app (database settings, secret key, etc.). Make sure to never commit real secret keys to the repository.

## Testing
If the project contains tests, run them from the `_server` directory. Example (if using pytest or Django test runner):
- Django test runner:
  python manage.py test

Add a test runner/configuration as needed.

## Deployment
This README focuses on local development. For deployment:
- Build the frontend for production (e.g., `npm run build`) and collect static files in Django.
- Configure a production-ready database and a secrets store for environment variables.
- Serve Django with a WSGI/ASGI server (Gunicorn/Uvicorn) behind a reverse proxy.

## Contributing
Contributions are welcome. Suggested workflow:
1. Fork the repository
2. Create a feature branch
3. Open a pull request with a clear description of changes

## License
Add a LICENSE file to the repository and update this section with the chosen license (e.g., MIT, Apache-2.0).

## Contact / Support
If you want, tell me how you'd like the README adjusted (more details on deployment, env variables, CI, or to include examples). I can also open a PR to update the README directly.
