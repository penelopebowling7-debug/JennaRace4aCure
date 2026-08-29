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
  apiKey: "PASTE_YOUR_API_KEY_HERE",
  authDomain: "PASTE_YOUR_PROJECT_ID_HERE.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID_HERE",
  storageBucket: "PASTE_YOUR_PROJECT_ID_HERE.appspot.com",
  messagingSenderId: "PASTE_YOUR_SENDER_ID_HERE",
  appId: "PASTE_YOUR_APP_ID_HERE"
};

firebase.initializeApp(firebaseConfig);
