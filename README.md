# From olfactum folder, update the README
@"
# Olfactum 🌸

A modern fragrance review and discovery platform.

## About

Olfactum is a comprehensive fragrance database and review platform where users can explore, review, and discover new scents. Built with modern web technologies and a passion for perfumery.

## Project Structure

\`\`\`
olfactum/
├── frontend/          # React frontend application
├── backend/           # Future backend API
├── README.md          # This file
└── .gitignore         # Git ignore rules
\`\`\`

## Getting Started

### Frontend
See [frontend/README.md](frontend/README.md) for frontend setup instructions.

### Backend
Coming soon...

## Features

- 🎨 Modern, responsive UI with light/dark themes
- 👃 Fragrance database with detailed notes
- ⭐ User reviews and ratings
- 🔍 Advanced search and filtering
- 📱 Mobile-friendly design

## Tech Stack

- **Frontend**: React, Vite, Material UI, React Router
- **Backend**: (Planned) FastAPI, SQLModel, MySQL
- **Deployment**: (Planned) Vercel (frontend) + Render (backend)

## License

MIT
"@ | Out-File -FilePath README.md -Encoding utf8
