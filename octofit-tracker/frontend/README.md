# OctoFit Tracker Frontend

This React 19 + Vite frontend uses `react-router-dom` and connects to the backend API routes:

- `/api/users/`
- `/api/teams/`
- `/api/activities/`
- `/api/leaderboard/`
- `/api/workouts/`

## Codespaces API Host Configuration

Define `VITE_CODESPACE_NAME` (for example in `octofit-tracker/frontend/.env.local`) when running in Codespaces:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The app builds the API base URL as:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api
```

If `VITE_CODESPACE_NAME` is not set, the app safely falls back to:

```text
http://localhost:8000/api
```

## Run

```bash
npm run dev --prefix octofit-tracker/frontend
```
