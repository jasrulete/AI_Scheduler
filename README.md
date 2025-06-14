# AI Scheduler

A modern web application for intelligent scheduling and task management, built with Next.js and Python.

## Project Structure

The project is organized into two main directories:

- `chedula_frontend_dev/`: Next.js frontend application
- `chedula_backend_dev/`: Python backend application

## Frontend (Next.js)

The frontend is built with:
- Next.js
- TypeScript
- Tailwind CSS
- ESLint for code quality
- Prettier for code formatting

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd chedula_frontend_dev
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Backend (Python)

The backend is built with Python and uses a virtual environment for dependency management.

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd chedula_backend_dev
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the backend server:
   ```bash
   python backend/main.py
   ```

## Development

- Frontend runs on `http://localhost:3000`
- Backend API endpoints are available at `http://localhost:8000`

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

[Add your license information here]
