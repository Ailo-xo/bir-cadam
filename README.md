# BIR KADAM

BIR KADAM is a premium life-planning and guidance platform built with React, Vite, Firebase, and Framer Motion. The project helps users organize practical action plans for life situations, explore guides and categories, and track progress through private personal plans.

## Features
- Premium SaaS-style landing page
- Responsive pages for home, categories, guides, plan creation, profile, and authentication
- Reusable UI components
- Firebase Authentication and Firestore-ready architecture
- Protected personal dashboard and plan pages
- Search and category filtering
- Plan creation, editing, deletion, and step completion tracking
- Local demo fallback when Firebase is not configured yet
- Planned AI integration placeholder separated from main plan logic

## Technologies
- React
- Vite
- JavaScript
- React Router DOM
- Firebase
- Framer Motion
- Lucide React

## Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the example environment file:
   ```bash
   copy .env.example .env
   ```
4. Fill in your Firebase values in `.env`.

## Firebase setup
1. Create a Firebase project in the Firebase Console.
2. Enable Firebase Authentication and select Email/Password.
3. Create a Firestore database.
4. Add a web app to your Firebase project.
5. Copy the config values into `.env`.
6. Publish the Firestore rules from `firestore.rules` in the Firebase Console.

## Environment variables
```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Run locally
```bash
npm run dev
```

## Production build
```bash
npm run build
```

## Deploy to Vercel
1. Connect your GitHub repository to Vercel.
2. Import the project as a Vite app.
3. Add the environment variables from `.env`.
4. Deploy the project.

## Screenshots
Add screenshots here after the first deployment or mockup review.

## Live demo
Placeholder: https://your-project.vercel.app

## Manual notes
This project includes a graceful local fallback mode for development when Firebase credentials are not available yet. When you add real Firebase credentials, the app will use the configured Authentication and Firestore services automatically.
