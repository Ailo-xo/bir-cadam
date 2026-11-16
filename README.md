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
- BIR AI assistant with private conversation history, structured action plans, and plan progress guidance

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

## BIR AI on Firebase Spark

BIR AI uses Firebase AI Logic with the Gemini Developer API and the `gemini-3.8-flash` model. This model is available without linking a Cloud Billing account. **Do not create or add a Gemini API key to `.env`**: Firebase AI Logic handles the provider connection without exposing a Gemini secret in the browser. The project does not deploy Firebase Cloud Functions.

1. In the Firebase Console, select the **same Firebase project used by the app**.
2. Open **AI Services → AI Logic**, choose **Get started**, and select **Gemini Developer API** (not Agent Platform / Vertex AI). The guided setup enables the required APIs and configures the Firebase-managed connection; it does not require a Gemini key or a billing account for the no-cost model.
3. Configure App Check for the web app. For local development, set `VITE_FIREBASE_APPCHECK_DEBUG=true` in `.env`, start the app, and copy the debug token printed in the browser console. Register it under **App Check → Apps → Manage debug tokens** in Firebase Console. Keep debug mode and the token out of production.
4. For a deployed website, register a production App Check provider. The project currently uses the standard reCAPTCHA v3 provider (not reCAPTCHA Enterprise); its public site key goes in `VITE_FIREBASE_APPCHECK_SITE_KEY`. Register its corresponding secret key in Firebase Console only; never put the secret in `.env` or frontend code. Add the deployed domain to the reCAPTCHA v3 site configuration.
5. Ensure App Check enforcement is enabled for **Firebase AI Logic**. The Firebase AI Logic setup flow may enable this automatically.
6. Publish the Firestore rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

Set the six `VITE_FIREBASE_*` values for the web app in `.env`. For a local debug session, also set:

```env
VITE_FIREBASE_APPCHECK_DEBUG=true
```

AI conversations and generated plans are written from the client using Firestore Security Rules that restrict access to the signed-in owner. Messages are sent to Google Gemini to produce replies; the UI warns users not to submit passwords, verification codes, identity numbers, or other sensitive information. BIR AI provides general guidance, not professional legal, medical, or financial advice.

The client uses a small allowlisted catalog of official Kyrgyz homepages for government information, employment/social support, education, e-services, and the National Bank. Records include the publisher, country, supported languages, last-checked date, and verification status. The listed homepage/domain was checked; this does not verify each policy or service page. The AI cannot browse the web, and users should confirm current details with the publisher.

AI request limits are controlled by Firebase AI Logic and Gemini Developer API project quotas, not a per-user Cloud Function. Free-tier model availability and quotas can change; Firebase AI Logic or Gemini may return a quota error when those limits are reached.

### Verify BIR AI

1. Complete Firebase AI Logic, App Check, Authentication, and Firestore setup above.
2. Sign in with Firebase Authentication and open `/ai`.
3. Start a prompt, answer a clarifying question, and continue until BIR AI offers a plan.
4. Edit the plan title/steps, remove a step if needed, save it, and open it from **My plans**.
5. Mark a step complete, then request next-step guidance from the plan card. Confirm that the response reflects the saved progress.
6. Switch KY/RU/EN and light/dark themes; confirm the interface updates. Use separate test accounts to verify conversation isolation.

## Environment variables
```bash
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_APPCHECK_SITE_KEY=
VITE_FIREBASE_APPCHECK_DEBUG=false
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
