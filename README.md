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

## Part 4: Paste in the security rules

1. Still in **Firestore Database**, click the **Rules** tab.
2. Delete everything in the box.
3. Open `firestore.rules` from this folder, copy all of it, and paste it in.
4. Click **Publish**.

This is what actually enforces "only approved emails can read or write," the app
itself can't do that on its own, the rules are what make it real.

You do **not** need to manually create anything in the Firestore data browser.
The very first person to sign in through the app (that'll be you) is
automatically made the first approved editor, the rules you just pasted are
what allow that to happen safely, and only for the very first person. Everyone
after that gets added from inside the app, see "Adding or removing editors
later" below.

## Part 5: Register a web app and get your config

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

## Part 6: Put it on GitHub Pages

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

## Part 7: Test it

1. Open the link. You should see a sign-in screen.
2. Sign in with your own Google account, the one you used to set up this Firebase
   project. As the very first person to sign in, you'll automatically become the
   first approved editor, there's nothing else to click.
3. You should land straight in the event dashboard. From here, add anyone else
   (Jenna, committee members) through **Overview -> Manage access**.
4. Try opening the same link in a different browser (or ask someone you just
   approved to open it) and add something on one side, you should see it appear on
   the other within a second or two.

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

**You already tried an earlier version of these instructions that asked you to
manually create a `config/access` document, and now you can't sign in at all:**
this is the most likely issue if you're reading this after already attempting
setup. The self-bootstrap rule in Part 4 only works while `config/access`
doesn't exist yet, so a document you created by hand (especially if a field was
typed wrong, e.g. the wrong field name, or emails saved as a plain string
instead of an array) will block it permanently, nobody, including you, can get
in or fix it from inside the app. The fix: in the Firebase console, go to
**Firestore Database**, open the **config** collection, open the **access**
document, and delete it (the trash icon). Make sure `firestore.rules` (Part 4)
is the current version from this folder and has been published. Then reload
your GitHub Pages link and sign in again, you'll be auto-approved as the first
editor.

**"Missing or insufficient permissions" error, or the app seems stuck on "Checking
your access":** means the security rules haven't been published yet (Part 4), or
you have `firebase-config.js` values that don't match your actual Firebase
project (Part 5). Double check both.

**Sign-in popup closes immediately or does nothing:** check that Google is enabled
as a sign-in provider (Part 2), and that you're testing on the actual GitHub Pages
link, not by opening `index.html` directly from your computer (Google sign-in needs
a real web address).

**Changes aren't showing up for someone else:** ask them to refresh the page once.
Everything after that syncs live without needing another refresh.
