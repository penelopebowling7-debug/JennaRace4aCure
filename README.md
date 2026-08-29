# Jenna's Racing for a Cure — Event HQ (free GitHub + Firebase version)

This is the same event app (attendees and tickets, donations and prizes, fundraising
activities, and the event checklist), rebuilt to run on two free services instead of
a paid Claude plan:

- **GitHub Pages** hosts the actual web page, for free.
- **Firebase** (Google's platform) provides the shared live database (Firestore) and
  the sign-in system, also free at this scale.

Only people whose email you've approved can sign in and edit. Sharing the link alone
gets nobody in, they also need to be on your approved list, and you manage that list
from inside the app itself once it's set up.

Everything below is click-by-click. It takes about 15 to 20 minutes the first time,
and you will not need to touch code.

---

## What you'll end up with

A private web address (something like `https://yourname.github.io/racing-for-a-cure/`)
that you send to your committee. Each person opens it, signs in with their Google
account, and if you've approved their email, they're straight into the live event
dashboard, same data, updating in real time for everyone.

---

## Part 1: Create your Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and sign
   in with your Google account.
2. Click **Create a project** (or **Add project**).
3. Give it a name, e.g. `racing-for-a-cure`. Firebase will suggest a project ID,
   that's fine as is.
4. You can turn off Google Analytics for this project, you don't need it. Click
   **Create project**, then **Continue** once it's ready.

## Part 2: Turn on sign-in

1. In the left sidebar, click **Build -> Authentication**.
2. Click **Get started**.
3. Under **Sign-in providers**, click **Google**, toggle it **Enable**, pick a
   support email (your own is fine), and click **Save**.

## Part 3: Turn on the database

1. In the left sidebar, click **Build -> Firestore Database**.
2. Click **Create database**.
3. Choose **Production mode** (not test mode), then pick a location close to you
   (any is fine, this doesn't change cost). Click **Enable**.

## Part 4: Create the approved-access list (important, do this before anything else)

This is the one manual step that has to happen before anyone, including you, can
sign in successfully.

1. Still in **Firestore Database**, click **Start collection**.
2. Collection ID: type `config` and click **Next**.
3. Document ID: type `access` (not auto-ID, type it exactly as `access`).
4. Add a field:
   - Field name: `emails`
   - Field type: **array**
   - Add each email address you want to start with as its own array item, one per
     line, lower case (yours, Jenna's, and anyone else you already know should have
     access). You can always add more people later from inside the app.
5. Click **Save**.

## Part 5: Paste in the security rules

1. Still in **Firestore Database**, click the **Rules** tab.
2. Delete everything in the box.
3. Open `firestore.rules` from this folder, copy all of it, and paste it in.
4. Click **Publish**.

This is what actually enforces "only approved emails can read or write," the app
itself can't do that on its own, the rules are what make it real.

## Part 6: Register a web app and get your config

1. Click the gear icon next to **Project Overview** (top left) -> **Project settings**.
2. Scroll down to **Your apps**, click the **</>** (web) icon.
3. Give it a nickname, e.g. `racing-for-a-cure-web`. You don't need Firebase Hosting
   checked, since you're using GitHub Pages instead. Click **Register app**.
4. You'll see a code block with a `firebaseConfig` object, values like `apiKey`,
   `authDomain`, `projectId` and so on. Keep this tab open.
5. Open `firebase-config.js` from this folder and replace each `PASTE_..._HERE`
   value with the matching value Firebase gave you. Save the file.
6. Back in the Firebase console, click **Continue to console** (you can skip the
   "add the Firebase SDK" instructions, that's already done in this project's
   `index.html`).

## Part 7: Put it on GitHub Pages

1. Go to [github.com](https://github.com) and sign in.
2. Click the **+** in the top right -> **New repository**. Name it something like
   `racing-for-a-cure`. Keep it **Public** (GitHub Pages on a free account needs a
   public repo; remember, access to your actual data is still controlled by the
   sign-in and the Firestore rules, not by hiding the code). Click **Create repository**.
3. On the new repo's page, click **uploading an existing file**.
4. Drag in every file from this folder: `index.html`, `styles.css`, `app.js`,
   `firebase-config.js` (with your real values already pasted in),
   `icon-180.png`, `icon-192.png`, `icon-512.png`, `favicon-32.png`, `ribbon-header.png`.
   You do not need to upload `firestore.rules` or this `README.md`, but it's fine if
   you do, they won't affect the site.
5. Scroll down and click **Commit changes**.
6. Click the repo's **Settings** tab -> **Pages** in the left sidebar.
7. Under **Build and deployment**, set **Source** to **Deploy from a branch**, branch
   **main**, folder **/ (root)**, then click **Save**.
8. Wait a minute or two, then refresh that Pages settings screen. You'll see
   "Your site is live at..." with your URL. That's the link you share.

## Part 8: Test it

1. Open the link. You should see a sign-in screen.
2. Sign in with a Google account whose email you added to the `emails` list in
   Part 4.
3. You should land straight in the event dashboard.
4. Try opening the same link in a different browser (or ask someone else on the
   list to open it) and add something on one side, you should see it appear on the
   other within a second or two.

---

## Adding or removing editors later

You don't need to come back to the Firebase console for this. Inside the app, open
**Overview**, then the **Manage access** panel near the bottom. Anyone already
approved can add a new email there, or remove someone, and it takes effect
immediately (a removed person is cut off straight away, even if they still have the
link).

## Cost

This all runs on Firebase's free tier (Spark plan), which includes far more reads
and writes per day than a single event's worth of committee members will ever use.
GitHub Pages is free for public repositories. You should not see any charge for
this.

## If something goes wrong

**"Missing or insufficient permissions" error, or the app seems stuck on "Checking
your access":** almost always means either the security rules haven't been
published yet (Part 5), or the `config/access` document doesn't exist yet or
doesn't have your email in it exactly as you sign in with (Part 4). Emails are
matched exactly, so double check for typos and that it's lower case.

**Sign-in popup closes immediately or does nothing:** check that Google is enabled
as a sign-in provider (Part 2), and that you're testing on the actual GitHub Pages
link, not by opening `index.html` directly from your computer (Google sign-in needs
a real web address).

**Changes aren't showing up for someone else:** ask them to refresh the page once.
Everything after that syncs live without needing another refresh.
