# Portfolio content management

This Next.js portfolio includes a Firebase-backed admin area at `/admin/login`.
With Firebase credentials configured, projects and achievements are stored in
Cloud Firestore and admin authentication uses Firebase Authentication. Without
credentials, the app uses a local browser fallback for development.

## Firebase setup

1. Create a project at [Firebase Console](https://console.firebase.google.com/).
2. Add a **Web app** in Project settings and copy its SDK values.
3. Enable **Authentication > Sign-in method > Email/Password**.
4. Create the admin user in Firebase Authentication with the email
   `sajibmr2005@gmail.com`. Set the password in Firebase itself; it is never
   stored in this repository or exposed to the browser.
5. Create a **Cloud Firestore** database. Start in production mode, then deploy
   the repository rules and indexes:

   ```bash
   npx firebase-tools login
   npx firebase-tools deploy --only firestore:rules,firestore:indexes --project YOUR_PROJECT_ID
   ```

6. Add the Firebase web app values to `.env.local` using the existing
   `NEXT_PUBLIC_FIREBASE_*` variables.
7. Restart the Next.js server after changing `.env.local`.

The database uses two collections:

- `projects/{projectId}`: `title`, `slug`, `description`, `coverImage`, `tags`,
  `liveUrl`, `githubUrl`, `featured`, `order`, `createdAt`, `updatedAt`.
- `achievements/{achievementId}`: `title`, `issuer`, `year`, `description`,
  `credentialUrl`, `createdAt`, `updatedAt`.

Public reads are allowed for these collections, while writes are restricted by
`firestore.rules` to the single admin email. The dashboard uses Firestore
`onSnapshot`, so public project and achievement pages update live after a save.

The Firebase web configuration is safe to expose through `NEXT_PUBLIC_*`
variables. Never put service-account JSON, SMTP passwords, or other private
credentials in a `NEXT_PUBLIC_*` variable or commit them to the repository.

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.
