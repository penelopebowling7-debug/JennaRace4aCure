/*
  Paste your own Firebase project's config below.

  Where to find it: Firebase console -> Project settings (gear icon) ->
  General tab -> scroll to "Your apps" -> the web app you registered ->
  SDK setup and configuration -> "Config".

  Full steps are in README.md. This file is safe to commit to a public
  GitHub repo: these values identify your project, they are not secret.
  Access is controlled by the Firestore security rules (firestore.rules),
  not by hiding this file.
*/

const firebaseConfig = {
  apiKey: "AIzaSyCO0TMeiJvDZ0Zx6PSUy4QElaX-aPgjypc",
  authDomain: "jenna-race-4-a-cure.firebaseapp.com",
  projectId: "jenna-race-4-a-cure",
  storageBucket: "jenna-race-4-a-cure.firebasestorage.app",
  messagingSenderId: "913680161780",
  appId: "1:913680161780:web:1f76c070830cda9c02b7a1"
};

firebase.initializeApp(firebaseConfig);
