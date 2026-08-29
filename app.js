(function () {
"use strict";

/* ============================= constants ============================= */

var ICONS = {
  overview: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="12" width="4" height="8"/><rect x="10" y="7" width="4" height="13"/><rect x="16" y="3" width="4" height="17"/></svg>',
  tickets: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z"/><path d="M13 6v12" stroke-dasharray="2 3"/></svg>',
  gift: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="9" width="18" height="12" rx="1"/><path d="M3 13h18"/><path d="M12 9v12"/><path d="M12 9C9 9 7.5 7 8.5 5.3C9.4 3.9 11.4 4.3 12 6.5"/><path d="M12 9c3 0 4.5-2 3.5-3.7C14.6 3.9 12.6 4.3 12 6.5"/></svg>',
  flag: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 3v18"/><path d="M5 4h13l-2 3.5L18 11H5"/></svg>',
  checklist: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="m8.5 12 2 2 4-4.5"/><path d="M8 17h8"/></svg>',
  people: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17.5" cy="9" r="2.4"/><path d="M15.8 14.2c2.6.3 4.7 2.5 4.7 5.8"/></svg>',
  plus: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  download: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>',
  trash: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/></svg>',
  copy: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
  chev: '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
  money: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 6.5v11M15.2 9.3c0-1.4-1.4-2.3-3.2-2.3s-3.2 1-3.2 2.3c0 3 6.4 1.5 6.4 4.4 0 1.4-1.4 2.3-3.2 2.3s-3.2-1-3.2-2.4"/></svg>',
  google: '<svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.6 2.4 30.1 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.1 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 3-2.2 5.5-4.7 7.2l7.4 5.7c4.3-4 6.8-9.9 6.8-17.4z"/><path fill="#FBBC05" d="M10.5 19.3A14.5 14.5 0 0 0 9.5 24c0 1.7.3 3.3.9 4.8l-7.9 6.1A24 24 0 0 1 0 24c0-3.9.9-7.5 2.6-10.8l7.9 6.1z"/><path fill="#34A853" d="M24 48c6.1 0 11.3-2 15-5.5l-7.4-5.7c-2.1 1.4-4.7 2.2-7.6 2.2-6.3 0-11.6-4.1-13.6-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>'
};

var TABS = [
  { id: "overview", label: "Overview", icon: "overview" },
  { id: "money", label: "Money Raised", icon: "money" },
  { id: "attendees", label: "Attendees & Tickets", icon: "tickets" },
  { id: "donations", label: "Donations & Prizes", icon: "gift" },
  { id: "activities", label: "Fundraising Activities", icon: "flag" },
  { id: "checklist", label: "Event Checklist", icon: "checklist" }
];

var ACTIVITY_IDEAS = [
  { id: "calcutta", name: "Calcutta sweepstake", tagline: "Guests draw a horse for each race for a small entry fee, then split the pool with the winners.", effort: "Low", potential: "$3 to $10 per entry, repeated every race", needs: "A draw box, race cards and a caller" },
  { id: "fashion", name: "Fashions on the field", tagline: "A best dressed or best fascinator competition judged between races.", effort: "Low", potential: "Entry fee or a vote with your dollar jar", needs: "A judge or two, a small prize, a spot for a mini catwalk" },
  { id: "raffle", name: "Raffle", tagline: "Sell books of raffle tickets for donated prizes, drawn late in the day.", effort: "Medium", potential: "Scales with prize quality, often the biggest single earner", needs: "Raffle ticket books, sellers on the floor, a draw at the end" },
  { id: "silent-auction", name: "Silent auction", tagline: "Bid sheets next to donated items or experiences, closing before the last race.", effort: "Medium", potential: "Strong for higher value donated items", needs: "Bid sheets, a display table, someone to close bidding on time" },
  { id: "wine-pull", name: "Pink champagne pull", tagline: "Guests buy a numbered ticket for a wrapped bottle, some are premium.", effort: "Low", potential: "Fast, steady turnover all afternoon", needs: "Donated or purchased bottles, wrapping, numbered tickets" },
  { id: "mystery-envelope", name: "Guess the winning horse", tagline: "A simple guessing game with a small entry fee, drawn at a set time.", effort: "Low", potential: "Small but easy, close to pure profit", needs: "Entry cards and a small prize" },
  { id: "photo-booth", name: "Pink photo booth", tagline: "A themed photo spot with boas, jockey silks and props, donation jar or small fee.", effort: "Low", potential: "Modest revenue, big social media reach", needs: "A backdrop, props and a phone or camera on a stand" },
  { id: "lucky-door", name: "Lucky door prize", tagline: "Every ticket stub goes into a draw for a donated prize, held near the end.", effort: "Low", potential: "No extra cost, keeps guests there until the finish", needs: "A donated prize and a draw barrel" },
  { id: "live-auction", name: "Live auction", tagline: "One or two headline experiences auctioned live by an MC.", effort: "High", potential: "Can be the biggest single earner with a standout item", needs: "A confident auctioneer, a headline item, a microphone" }
];

var DONATION_TARGETS = [
  "Hair, beauty and day spas", "Boutiques and fashion stores", "Wineries, breweries and cellar doors",
  "Restaurants, cafes and caterers", "Hotels and accommodation", "Homewares and gift stores",
  "Florists and photographers", "Gyms, yoga and wellness studios", "Jewellers and beauty brands",
  "Local sporting clubs and racing clubs"
];

var DONATION_TIPS = [
  "Ask early, ideally eight or more weeks out. Many businesses budget for donations in advance.",
  "Be specific about what you need. A prize, a gift voucher or an experience is an easy yes.",
  "Offer something back, such as a mention on signage, social media or in your thank you speech.",
  "Make it easy. Offer to collect the item, or send a simple one line form to fill in.",
  "Keep a record of every ask, so you always know who to follow up and who to thank.",
  "Follow up once if you do not hear back, then say thank you either way.",
  "Send a thank you and a receipt promptly once you receive the donation."
];

var EMAIL_TEMPLATE = "Hi [Contact Name],\n\nMy name is Jenna and I'm organising Racing for a Cure, a race day fundraiser on Saturday 17 October in support of breast cancer research, care and support. My mum is currently living with breast cancer, and turning my 40th birthday into something that gives back means the world to me.\n\nWe're running a raffle and a few fun fundraising activities on the day, and I would love to include [Business Name] among our supporters. Would you be open to donating a prize, product, voucher or experience?\n\nIn return, we're happy to promote your business on our event signage, social media and in our thank you messages to guests on the day.\n\nIf you're able to help, I can arrange pickup or drop off at a time that suits you, and we will provide a receipt for your records.\n\nThank you so much for considering it. Every contribution, big or small, brings us closer to a cure.\n\nWarmly,\nJenna";

var ATTENDEE_STATUS_LABELS = { invited: "Invited", attending: "Attending", paid: "Paid", comp: "Complimentary" };
var DONATION_STATUS_LABELS = { "to-contact": "To contact", asked: "Asked", confirmed: "Confirmed", received: "Received", declined: "Declined" };
var ACTIVITY_STATUS_LABELS = { planning: "Planning", confirmed: "Confirmed", complete: "Complete" };
var CHECKLIST_STATUS_LABELS = { "not-started": "Not started", "in-progress": "In progress", done: "Done" };
var CHECKLIST_CATEGORIES = ["Venue & Logistics", "Marketing & Promotion", "Guest Management", "Fundraising Setup", "Day-Of Run Sheet", "Post-Event"];

var DEFAULT_CHECKLIST = [
  { category: "Venue & Logistics", task: "Confirm venue booking and pay deposit", timing: "8+ weeks before" },
  { category: "Venue & Logistics", task: "Confirm date and run of show with the venue", timing: "8+ weeks before" },
  { category: "Venue & Logistics", task: "Book catering and confirm food and drink menu", timing: "6-8 weeks before" },
  { category: "Venue & Logistics", task: "Arrange bar service and check if a liquor permit is needed", timing: "6-8 weeks before" },
  { category: "Venue & Logistics", task: "Book tables, chairs, linens and pink styling", timing: "4-6 weeks before" },
  { category: "Venue & Logistics", task: "Book AV, microphone and music for announcements", timing: "4-6 weeks before" },
  { category: "Venue & Logistics", task: "Confirm parking, transport and accessibility for guests", timing: "4-6 weeks before" },
  { category: "Venue & Logistics", task: "Check public liability insurance for the event", timing: "6-8 weeks before" },
  { category: "Marketing & Promotion", task: "Finalise the Racing for a Cure invitation and share it", timing: "8+ weeks before" },
  { category: "Marketing & Promotion", task: "Set up the ticket sales page and payment method", timing: "6-8 weeks before" },
  { category: "Marketing & Promotion", task: "Create an event page on Facebook and Instagram", timing: "6-8 weeks before" },
  { category: "Marketing & Promotion", task: "Share the invitation with friends, family and community groups", timing: "6-8 weeks before" },
  { category: "Marketing & Promotion", task: "Order signage, banners and pink ribbon styling for the day", timing: "2-4 weeks before" },
  { category: "Marketing & Promotion", task: "Print raffle tickets and any sweepstake cards", timing: "2-4 weeks before" },
  { category: "Marketing & Promotion", task: "Post a reminder and countdown in the two weeks before the event", timing: "1-2 weeks before" },
  { category: "Guest Management", task: "Start selling tickets and logging attendees in the app", timing: "8+ weeks before" },
  { category: "Guest Management", task: "Send confirmation emails to everyone who buys a ticket", timing: "Ongoing" },
  { category: "Guest Management", task: "Track dietary requirements and any accessibility needs", timing: "2-4 weeks before" },
  { category: "Guest Management", task: "Prepare name badges and a table seating plan", timing: "1-2 weeks before" },
  { category: "Guest Management", task: "Send a reminder email one week before the event", timing: "1-2 weeks before" },
  { category: "Guest Management", task: "Prepare a welcome pack or programme for guests", timing: "1-2 weeks before" },
  { category: "Fundraising Setup", task: "Choose which fundraising activities will run on the day", timing: "8+ weeks before" },
  { category: "Fundraising Setup", task: "Start reaching out to local businesses for prize donations", timing: "8+ weeks before" },
  { category: "Fundraising Setup", task: "Set an overall fundraising target", timing: "8+ weeks before" },
  { category: "Fundraising Setup", task: "Arrange a card payment facility for sales on the day", timing: "2-4 weeks before" },
  { category: "Fundraising Setup", task: "Prepare a prize and donation display table", timing: "1-2 weeks before" },
  { category: "Fundraising Setup", task: "Recruit and brief volunteers to run each activity", timing: "2-4 weeks before" },
  { category: "Day-Of Run Sheet", task: "Set up decor, signage and the registration table", timing: "Day of" },
  { category: "Day-Of Run Sheet", task: "Brief volunteers on their roles and timings", timing: "Day of" },
  { category: "Day-Of Run Sheet", task: "Open guest check-in and registration", timing: "Day of" },
  { category: "Day-Of Run Sheet", task: "Welcome speech and kick off the event", timing: "Day of" },
  { category: "Day-Of Run Sheet", task: "Run scheduled fundraising activities and draws", timing: "Day of" },
  { category: "Day-Of Run Sheet", task: "Thank you speech and prize presentations", timing: "Day of" },
  { category: "Day-Of Run Sheet", task: "Pack down the venue", timing: "Day of" },
  { category: "Post-Event", task: "Send thank you messages to everyone who attended", timing: "Within 1 week after" },
  { category: "Post-Event", task: "Send thank you notes and receipts to donors and sponsors", timing: "Within 1 week after" },
  { category: "Post-Event", task: "Reconcile final ticket and fundraising income", timing: "Within 1 week after" },
  { category: "Post-Event", task: "Announce the total raised on social media", timing: "Within 2 weeks after" },
  { category: "Post-Event", task: "Debrief with the committee and capture what to improve next time", timing: "Within 2 weeks after" }
];

var DEFAULT_SETTINGS = { eventName: "Jenna's Racing for a Cure", tagline: "A day of racing in support of breast cancer research, care and support", eventDate: "2026-10-17", ticketPrice: 215, ticketGoal: 100 };

/* ============================= firebase refs ============================= */

var auth = firebase.auth();
var db = firebase.firestore();
try { db.enablePersistence({ synchronizeTabs: true }).catch(function () {}); } catch (e) {}

/* ============================= state ============================= */

var STATE = { settings: DEFAULT_SETTINGS, attendees: [], donations: [], activities: [], checklist: [], manualFunds: [] };
var accessEmails = [];
var currentUser = null;
var isApproved = false;
var appStarted = false;
var unsubscribers = [];

var ui = { tab: "overview", attendeeSearch: "", attendeeFilter: "all", donationFilter: "all", online: navigator.onLine };

/* ============================= helpers ============================= */

function esc(s) {
  if (s === null || s === undefined) return "";
  return String(s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

function money(n) {
  n = Number(n) || 0;
  return "$" + n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }
function pct(part, whole) { if (!whole) return 0; return clamp(Math.round((part / whole) * 100), 0, 100); }

function fmtDate(iso) {
  if (!iso) return "";
  var d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function daysUntil(iso) {
  var target = new Date(iso + "T00:00:00");
  var now = new Date();
  var todayMid = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target - todayMid) / 86400000);
}

function toast(msg) {
  var wrap = document.getElementById("toast-wrap");
  if (!wrap) return;
  var el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(function () { el.remove(); }, 3200);
}

function icon(name) { return ICONS[name] || ""; }

/* ============================= derived numbers ============================= */

function computeStats() {
  var ticketsSold = STATE.attendees.reduce(function (sum, a) { return sum + (Number(a.tickets) || 0); }, 0);
  var revenuePaid = STATE.attendees.reduce(function (sum, a) { return a.status === "paid" ? sum + (Number(a.amountPaid) || 0) : sum; }, 0);
  var revenuePending = STATE.attendees.reduce(function (sum, a) { return (a.status === "invited" || a.status === "attending") ? sum + (Number(a.amountPaid) || (Number(a.tickets) || 0) * (Number(STATE.settings.ticketPrice) || 0)) : sum; }, 0);
  var donationValueSecured = STATE.donations.reduce(function (sum, d) { return (d.status === "confirmed" || d.status === "received") ? sum + (Number(d.value) || 0) : sum; }, 0);
  var donationsConfirmedCount = STATE.donations.filter(function (d) { return d.status === "confirmed" || d.status === "received"; }).length;
  var activityRevenueActual = STATE.activities.reduce(function (sum, a) { return sum + (Number(a.actualRevenue) || 0); }, 0);
  var activityRevenueTarget = STATE.activities.reduce(function (sum, a) { return sum + (Number(a.targetRevenue) || 0); }, 0);
  var checklistDone = STATE.checklist.filter(function (c) { return c.status === "done"; }).length;
  var checklistTotal = STATE.checklist.length;
  var manualFundsTotal = STATE.manualFunds.reduce(function (sum, m) { return sum + (Number(m.amount) || 0); }, 0);
  var totalRaised = revenuePaid + activityRevenueActual + manualFundsTotal;
  return {
    ticketsSold: ticketsSold, revenuePaid: revenuePaid, revenuePending: revenuePending,
    donationValueSecured: donationValueSecured, donationsConfirmedCount: donationsConfirmedCount,
    activityRevenueActual: activityRevenueActual, activityRevenueTarget: activityRevenueTarget,
    checklistDone: checklistDone, checklistTotal: checklistTotal,
    manualFundsTotal: manualFundsTotal, totalRaised: totalRaised
  };
}

/* ============================= firestore mutations ============================= */

function col(name) { return db.collection(name); }

function addDoc(collectionName, data) {
  var ref = col(collectionName).doc();
  data.id = ref.id;
  data.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  return ref.set(data).catch(function (err) { toast("Could not save, please try again."); console.error(err); });
}

function updateDoc(collectionName, id, patch) {
  return col(collectionName).doc(id).update(patch).catch(function (err) { toast("Could not save that change."); console.error(err); });
}

function removeDoc(collectionName, id) {
  return col(collectionName).doc(id).delete().catch(function (err) { toast("Could not remove that item."); console.error(err); });
}

function updateSettings(patch) {
  return db.collection("settings").doc("event").set(patch, { merge: true }).catch(function (err) { toast("Could not save settings."); console.error(err); });
}

function addApprovedEmail(email) {
  email = (email || "").trim().toLowerCase();
  if (!email || email.indexOf("@") < 0) { toast("Enter a valid email address."); return; }
  db.collection("config").doc("access").set(
    { emails: firebase.firestore.FieldValue.arrayUnion(email) }, { merge: true }
  ).then(function () { toast(email + " can now sign in and edit."); }).catch(function (err) { toast("Could not update access."); console.error(err); });
}

function removeApprovedEmail(email) {
  if (currentUser && email === currentUser.email) { toast("You can't remove your own access here."); return; }
  db.collection("config").doc("access").update(
    { emails: firebase.firestore.FieldValue.arrayRemove(email) }
  ).then(function () { toast(email + " removed."); }).catch(function (err) { toast("Could not update access."); console.error(err); });
}

/* ============================= auth flow ============================= */

function signIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).catch(function (err) {
    if (err && err.code === "auth/popup-closed-by-user") return;
    if (err && (err.code === "auth/popup-blocked" || err.code === "auth/cancelled-popup-request")) {
      auth.signInWithRedirect(provider);
      return;
    }
    toast("Sign in did not work, please try again.");
    console.error(err);
  });
}

auth.getRedirectResult().catch(function (err) {
  toast("Sign in did not work, please try again.");
  console.error(err);
});

function signOutNow() {
  stopListeners();
  auth.signOut();
}

auth.onAuthStateChanged(function (user) {
  currentUser = user;
  stopListeners();
  if (!user) {
    isApproved = false;
    appStarted = false;
    renderGateSignedOut();
    return;
  }
  renderGateChecking();
  var bootstrapAttempted = false;
  var unsubAccess = db.collection("config").doc("access").onSnapshot(function (doc) {
    if (!doc.exists) {
      // Nobody has ever signed in before. The first person to arrive becomes
      // the first approved editor automatically, see firestore.rules: this
      // write is only allowed while the document truly doesn't exist yet.
      accessEmails = [];
      if (!bootstrapAttempted) {
        bootstrapAttempted = true;
        db.collection("config").doc("access").set({ emails: [(user.email || "").toLowerCase()] })
          .catch(function (err) { console.error(err); renderGateError(); });
      }
      return;
    }
    accessEmails = doc.data().emails || [];
    var approvedNow = accessEmails.indexOf((user.email || "").toLowerCase()) > -1;
    if (approvedNow && !isApproved) {
      isApproved = true;
      startApp();
    } else if (!approvedNow) {
      isApproved = false;
      appStarted = false;
      renderGateWaiting();
    } else {
      renderAll();
    }
  }, function (err) {
    console.error(err);
    renderGateError();
  });
  unsubscribers.push(unsubAccess);
});

function stopListeners() {
  unsubscribers.forEach(function (u) { try { u(); } catch (e) {} });
  unsubscribers = [];
}

/* ============================= start app / data listeners ============================= */

function startApp() {
  if (appStarted) return;
  appStarted = true;
  document.getElementById("gate").innerHTML = "";
  document.getElementById("root").hidden = false;

  unsubscribers.push(db.collection("settings").doc("event").onSnapshot(function (doc) {
    STATE.settings = Object.assign({}, DEFAULT_SETTINGS, doc.exists ? doc.data() : {});
    if (!doc.exists) db.collection("settings").doc("event").set(DEFAULT_SETTINGS).catch(function () {});
    renderAll();
  }));

  unsubscribers.push(col("attendees").onSnapshot(function (snap) {
    STATE.attendees = snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data()); })
      .sort(function (a, b) { return (a.dateAdded || "").localeCompare(b.dateAdded || ""); });
    renderAll();
  }));

  unsubscribers.push(col("donations").onSnapshot(function (snap) {
    STATE.donations = snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data()); });
    renderAll();
  }));

  unsubscribers.push(col("activities").onSnapshot(function (snap) {
    STATE.activities = snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data()); });
    renderAll();
  }));

  unsubscribers.push(col("manualFunds").onSnapshot(function (snap) {
    STATE.manualFunds = snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data()); })
      .sort(function (a, b) { return (a.dateAdded || "").localeCompare(b.dateAdded || ""); });
    renderAll();
  }));

  unsubscribers.push(col("checklist").onSnapshot(function (snap) {
    if (snap.empty) {
      seedChecklist();
    } else {
      STATE.checklist = snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data()); });
      renderAll();
    }
  }));

  window.addEventListener("online", function () { ui.online = true; renderAll(); });
  window.addEventListener("offline", function () { ui.online = false; renderAll(); });
}

function seedChecklist() {
  var batch = db.batch();
  DEFAULT_CHECKLIST.forEach(function (item) {
    var ref = col("checklist").doc();
    batch.set(ref, { id: ref.id, category: item.category, task: item.task, timing: item.timing, owner: "", status: "not-started", notes: "" });
  });
  batch.commit().catch(function (err) { console.error(err); });
}

/* ============================= gate screens ============================= */

function renderGateSignedOut() {
  document.getElementById("root").hidden = true;
  document.getElementById("gate").innerHTML =
    '<div class="gate-wrap"><div class="gate-card">' +
      '<div class="brand-mark"><img src="ribbon-header.png" alt=""></div>' +
      "<h1>Jenna's Racing for a Cure</h1>" +
      "<p>Sign in with the Google account you were invited with to view and update the event dashboard.</p>" +
      '<button type="button" class="google-btn" id="signin-btn">' + icon("google") + " Sign in with Google</button>" +
      '<div class="gate-note">Only people Jenna has approved can get in. If you\'re expecting access and it\'s not working, ask her to check the Manage Access list.</div>' +
    "</div></div>";
  document.getElementById("signin-btn").addEventListener("click", signIn);
}

function renderGateChecking() {
  document.getElementById("root").hidden = true;
  document.getElementById("gate").innerHTML =
    '<div class="gate-wrap"><div class="gate-card">' +
      '<div class="brand-mark"><img src="ribbon-header.png" alt=""></div>' +
      "<h1>Jenna's Racing for a Cure</h1>" +
      "<p>Checking your access&hellip;</p>" +
    "</div></div>";
}

function renderGateWaiting() {
  document.getElementById("root").hidden = true;
  document.getElementById("gate").innerHTML =
    '<div class="gate-wrap"><div class="gate-card">' +
      '<div class="brand-mark"><img src="ribbon-header.png" alt=""></div>' +
      "<h1>Almost there</h1>" +
      "<p>You're signed in, but this account isn't on the approved list yet. Ask Jenna (or another editor) to add your email in Manage Access, then refresh this page.</p>" +
      '<div class="gate-email">' + esc((currentUser && currentUser.email) || "") + "</div><br>" +
      '<button type="button" class="signout-link" id="signout-btn">Sign in with a different account</button>' +
    "</div></div>";
  document.getElementById("signout-btn").addEventListener("click", signOutNow);
}

function renderGateError() {
  document.getElementById("root").hidden = true;
  document.getElementById("gate").innerHTML =
    '<div class="gate-wrap"><div class="gate-card">' +
      "<h1>Something went wrong</h1>" +
      "<p>We couldn't check your access. This can happen if the Firestore security rules haven't been set up yet, see README.md.</p>" +
      '<button type="button" class="signout-link" id="signout-btn2">Sign out</button>' +
    "</div></div>";
  document.getElementById("signout-btn2").addEventListener("click", signOutNow);
}

/* ============================= render: shell ============================= */

function renderAll() {
  if (!appStarted) return;
  var root = document.getElementById("root");
  if (!root) return;
  var scrollY = window.scrollY;
  root.innerHTML = renderHeader() + renderBanner() + '<div class="container">' + renderTabbar() + '<div class="tab-content">' + renderTabPanel() + "</div></div>" + renderFooter();
  window.scrollTo(0, scrollY);
}

function renderHeader() {
  var days = daysUntil(STATE.settings.eventDate);
  var daysLabel = days > 0 ? "days to go" : (days === 0 ? "It's today!" : "since the event");
  var daysNum = days > 0 ? days : Math.abs(days);
  return '' +
    '<div class="site-header"><div class="site-header-inner">' +
      '<div class="brand">' +
        '<div class="brand-mark"><img src="ribbon-header.png" alt=""></div>' +
        '<div class="brand-text">' +
          '<h1>' + esc(STATE.settings.eventName || "Jenna's Racing for a Cure") + "</h1>" +
          "<p>" + esc(STATE.settings.tagline || "") + "</p>" +
        "</div>" +
      "</div>" +
      '<div class="header-meta">' +
        '<div class="save-indicator"><span class="sync-pill">' + (ui.online ? "Synced live" : "Offline, will sync when back online") + " &middot; " + esc((currentUser && currentUser.email) || "") + '</span>' +
          '<button type="button" class="signout-link" data-action="sign-out" style="margin:0">Sign out</button></div>' +
        (days === 0 ? "" : '<div class="countdown"><div class="num">' + daysNum + '</div><div class="lbl">' + daysLabel + "</div></div>") +
      "</div>" +
    "</div></div>";
}

function renderBanner() { return ""; }

function renderTabbar() {
  return '<div class="tabbar">' + TABS.map(function (t) {
    return '<button type="button" class="tab-btn' + (ui.tab === t.id ? " active" : "") + '" data-action="tab" data-tab="' + t.id + '">' + icon(t.icon) + "<span>" + esc(t.label) + "</span></button>";
  }).join("") + "</div>";
}

function renderFooter() {
  return '<footer class="app-footer">Jenna\'s Racing for a Cure Event HQ. Every ticket, every dollar, every step brings us closer to a cure.</footer>';
}

function renderTabPanel() {
  switch (ui.tab) {
    case "overview": return renderOverview();
    case "money": return renderMoneyRaised();
    case "attendees": return renderAttendees();
    case "donations": return renderDonations();
    case "activities": return renderActivities();
    case "checklist": return renderChecklist();
    default: return "";
  }
}

/* ============================= render: overview ============================= */

function renderOverview() {
  var s = computeStats();
  var goal = Number(STATE.settings.ticketGoal) || 100;
  var price = Number(STATE.settings.ticketPrice) || 0;
  var ticketPct = pct(s.ticketsSold, goal);
  var checklistPct = pct(s.checklistDone, s.checklistTotal);
  var attendeeCount = STATE.attendees.length;

  var catRows = CHECKLIST_CATEGORIES.map(function (cat) {
    var items = STATE.checklist.filter(function (c) { return c.category === cat; });
    var done = items.filter(function (c) { return c.status === "done"; }).length;
    var p = pct(done, items.length);
    return '<div class="field" style="gap:4px"><div style="display:flex;justify-content:space-between;font-size:12.5px"><span>' + esc(cat) + '</span><span class="muted">' + done + "/" + items.length + '</span></div><div class="bar-track"><div class="bar-fill" style="width:' + p + '%"></div></div></div>';
  }).join("");

  return '<div class="tab-panel">' +
    '<div class="section-head"><div><div class="eyebrow">Event overview</div><h2>' + fmtDate(STATE.settings.eventDate) + "</h2><p>Track ticket sales, fundraising and planning progress for " + esc(STATE.settings.eventName) + " in one place. Everyone who's signed in sees the same live numbers.</p></div></div>" +

    '<div class="kpi-grid">' +
      '<div class="kpi"><div class="kpi-label">Tickets sold</div><div class="kpi-value">' + s.ticketsSold + ' <span class="muted" style="font-size:15px;font-weight:700">/ ' + goal + '</span></div><div class="kpi-sub">' + attendeeCount + " " + (attendeeCount === 1 ? "attendee" : "attendees") + ' logged</div><div class="bar-track"><div class="bar-fill" style="width:' + ticketPct + '%"></div></div></div>' +
      '<div class="kpi success"><div class="kpi-label">Ticket revenue</div><div class="kpi-value">' + money(s.revenuePaid) + '</div><div class="kpi-sub">' + money(s.revenuePending) + " pending, at " + money(price) + " per ticket</div></div>" +
      '<div class="kpi gold"><div class="kpi-label">Prize donations secured</div><div class="kpi-value">' + s.donationsConfirmedCount + '</div><div class="kpi-sub">' + money(s.donationValueSecured) + " in donated value</div></div>" +
      '<div class="kpi"><div class="kpi-label">Fundraising activities</div><div class="kpi-value">' + money(s.activityRevenueActual) + '</div><div class="kpi-sub">' + money(s.activityRevenueTarget) + " targeted across " + STATE.activities.length + " " + (STATE.activities.length === 1 ? "activity" : "activities") + '</div></div>' +
      '<div class="kpi success"><div class="kpi-label">Total raised so far</div><div class="kpi-value">' + money(s.totalRaised) + '</div><div class="kpi-sub">Tickets paid plus activity income</div></div>' +
      '<div class="kpi"><div class="kpi-label">Checklist progress</div><div class="kpi-value">' + checklistPct + '%</div><div class="kpi-sub">' + s.checklistDone + " of " + s.checklistTotal + ' tasks done</div><div class="bar-track"><div class="bar-fill" style="width:' + checklistPct + '%"></div></div></div>' +
    "</div>" +

    '<div class="two-col">' +
      '<div class="card"><h3 style="margin-bottom:12px">Checklist by category</h3><div style="display:flex;flex-direction:column;gap:12px">' + catRows + "</div></div>" +
      '<div class="card"><h3 style="margin-bottom:4px">Quick add</h3><p class="muted" style="margin:0 0 12px;font-size:13px">Jump straight into the most common actions.</p>' +
        '<div style="display:flex;flex-direction:column;gap:8px">' +
          '<button type="button" class="btn subtle" data-action="tab" data-tab="attendees" style="justify-content:flex-start">' + icon("plus") + " Add an attendee</button>" +
          '<button type="button" class="btn subtle" data-action="tab" data-tab="donations" style="justify-content:flex-start">' + icon("plus") + " Log a prize donation</button>" +
          '<button type="button" class="btn subtle" data-action="tab" data-tab="activities" style="justify-content:flex-start">' + icon("plus") + " Plan a fundraising activity</button>" +
          '<button type="button" class="btn subtle" data-action="tab" data-tab="checklist" style="justify-content:flex-start">' + icon("plus") + " Add a checklist task</button>" +
        "</div></div>" +
    "</div>" +

    renderSettingsPanel() +
    renderAccessPanel() +
  "</div>";
}

function renderSettingsPanel() {
  var s = STATE.settings;
  return '<details class="panel"><summary>Event settings <span>' + icon("chev") + '</span></summary><div class="panel-body">' +
    '<div class="form-grid">' +
      '<div class="field"><label>Event name</label><input data-settings-field="eventName" value="' + esc(s.eventName) + '"></div>' +
      '<div class="field"><label>Event date</label><input type="date" data-settings-field="eventDate" value="' + esc(s.eventDate) + '"></div>' +
      '<div class="field"><label>Ticket price ($)</label><input type="number" min="0" step="1" data-settings-field="ticketPrice" value="' + esc(s.ticketPrice) + '"></div>' +
      '<div class="field"><label>Ticket goal</label><input type="number" min="1" step="1" data-settings-field="ticketGoal" value="' + esc(s.ticketGoal) + '"></div>' +
      '<div class="field" style="grid-column:1/-1"><label>Tagline</label><input data-settings-field="tagline" value="' + esc(s.tagline) + '"></div>' +
    "</div></div></details>";
}

function renderAccessPanel() {
  var rows = accessEmails.map(function (email) {
    var isYou = currentUser && email === currentUser.email;
    return '<div class="access-row"><span class="email">' + esc(email) + "</span>" +
      (isYou ? '<span class="you-badge">You</span>' : '<button type="button" class="icon-btn" data-action="remove-access" data-email="' + esc(email) + '" title="Remove access">' + icon("trash") + "</button>") +
    "</div>";
  }).join("");
  if (!rows) rows = '<p class="muted" style="font-size:13px">No one on the list yet, which shouldn\'t be possible since you\'re signed in. Something may be misconfigured, see README.md.</p>';

  return '<details class="panel"><summary>' + icon("people") + ' Manage access <span>' + icon("chev") + '</span></summary><div class="panel-body">' +
    '<p class="muted" style="font-size:13px;margin:0 0 8px">Anyone on this list can sign in with Google and edit the event. Remove someone to cut off their access immediately, forwarding the link alone gets nobody in.</p>' +
    '<div>' + rows + "</div>" +
    '<form id="add-access-form"><input type="email" name="email" placeholder="name@email.com" required><button type="submit" class="btn sm">' + icon("plus") + " Add</button></form>" +
  "</div></details>";
}

/* ============================= render: money raised ============================= */

function renderMoneyRaised() {
  var s = computeStats();
  var price = Number(STATE.settings.ticketPrice) || 0;
  var rows = STATE.manualFunds.map(renderManualFundRow).join("");
  if (!STATE.manualFunds.length) {
    rows = '<tr><td colspan="5" class="empty-row">No manual entries yet. Log cash, bank transfers or any money raised that is not already tracked through Attendees or Fundraising Activities.</td></tr>';
  }

  return '<div class="tab-panel">' +
    '<div class="section-head"><div><div class="eyebrow">Money raised</div><h2>' + money(s.totalRaised) + ' raised so far</h2><p>Set your ticket price here, then track every dollar raised, whether it came through ticket sales, a fundraising activity, or a manual entry below.</p></div></div>' +

    '<div class="kpi-grid">' +
      '<div class="kpi"><div class="kpi-label">Ticket price</div><div class="kpi-value">' + money(price) + '</div><div class="kpi-sub">per ticket, set below</div></div>' +
      '<div class="kpi success"><div class="kpi-label">Ticket revenue (paid)</div><div class="kpi-value">' + money(s.revenuePaid) + '</div><div class="kpi-sub">' + money(s.revenuePending) + ' pending from invited or attending guests</div></div>' +
      '<div class="kpi"><div class="kpi-label">Activity revenue</div><div class="kpi-value">' + money(s.activityRevenueActual) + '</div><div class="kpi-sub">from Fundraising Activities</div></div>' +
      '<div class="kpi gold"><div class="kpi-label">Manually logged</div><div class="kpi-value">' + money(s.manualFundsTotal) + '</div><div class="kpi-sub">' + STATE.manualFunds.length + ' ' + (STATE.manualFunds.length === 1 ? "entry" : "entries") + '</div></div>' +
      '<div class="kpi success"><div class="kpi-label">Total raised</div><div class="kpi-value">' + money(s.totalRaised) + '</div><div class="kpi-sub">Ticket revenue + activity revenue + manual entries</div></div>' +
    "</div>" +

    '<details class="panel" open><summary>Ticket price <span>' + icon("chev") + '</span></summary><div class="panel-body">' +
      '<div class="form-grid">' +
        '<div class="field"><label>Ticket price ($)</label><input type="number" min="0" step="1" data-settings-field="ticketPrice" value="' + esc(price) + '"></div>' +
        '<div class="field"><label>Ticket goal</label><input type="number" min="1" step="1" data-settings-field="ticketGoal" value="' + esc(STATE.settings.ticketGoal) + '"></div>' +
      "</div></div></details>" +

    '<details class="panel" open><summary>Log money raised <span>' + icon("chev") + '</span></summary><div class="panel-body">' +
      '<p class="muted" style="font-size:13px;margin:0 0 8px">Use this for cash collected on the day, bank transfers, or any lump sum that is not already tied to a specific attendee or activity.</p>' +
      '<form id="add-manual-fund-form" class="form-grid">' +
        '<div class="field"><label>Source *</label><input name="source" required placeholder="e.g. Cash tin, bank transfer"></div>' +
        '<div class="field"><label>Amount ($)</label><input name="amount" type="number" min="0" step="0.01" value="0"></div>' +
        '<div class="field"><label>Date</label><input name="dateAdded" type="date" value="' + new Date().toISOString().slice(0, 10) + '"></div>' +
        '<div class="field"><label>Notes</label><input name="notes" placeholder="Optional"></div>' +
        '<div class="field" style="justify-content:flex-end"><button type="submit" class="btn">' + icon("plus") + " Add entry</button></div>" +
      "</form></div></details>" +

    '<div class="table-wrap"><table class="data"><thead><tr>' +
      "<th>Source</th><th>Amount</th><th>Date</th><th>Notes</th><th></th>" +
    "</tr></thead><tbody>" + rows + "</tbody></table></div>" +
  "</div>";
}

function renderManualFundRow(m) {
  return '<tr data-collection="manualFunds" data-id="' + m.id + '">' +
    '<td><input data-field="source" value="' + esc(m.source) + '"></td>' +
    '<td class="num"><input data-field="amount" type="number" min="0" step="0.01" value="' + esc(m.amount) + '" style="width:90px;text-align:right"></td>' +
    '<td><input data-field="dateAdded" type="date" value="' + esc(m.dateAdded) + '" style="width:150px"></td>' +
    '<td><input data-field="notes" value="' + esc(m.notes) + '"></td>' +
    '<td><button type="button" class="icon-btn" data-action="remove" title="Remove entry">' + icon("trash") + "</button></td>" +
  "</tr>";
}

/* ============================= render: attendees ============================= */

function filteredAttendees() {
  var q = ui.attendeeSearch.trim().toLowerCase();
  return STATE.attendees.filter(function (a) {
    if (ui.attendeeFilter !== "all" && a.status !== ui.attendeeFilter) return false;
    if (!q) return true;
    return (a.name || "").toLowerCase().indexOf(q) > -1 || (a.email || "").toLowerCase().indexOf(q) > -1 || (a.notes || "").toLowerCase().indexOf(q) > -1;
  });
}

function renderAttendees() {
  var s = computeStats();
  var goal = Number(STATE.settings.ticketGoal) || 100;
  var list = filteredAttendees();
  var rows = list.map(renderAttendeeRow).join("");
  if (!list.length) {
    rows = '<tr><td colspan="7" class="empty-row">' + (STATE.attendees.length ? "No attendees match your search." : "No attendees yet. Add your first guest, or paste a list below.") + "</td></tr>";
  }

  return '<div class="tab-panel">' +
    '<div class="section-head"><div><div class="eyebrow">Attendees & tickets</div><h2>' + s.ticketsSold + " of " + goal + ' tickets sold</h2><p>Add guests one at a time, or paste in a list to bulk load everyone who is coming.</p></div>' +
      '<button type="button" class="btn" data-action="export-csv">' + icon("download") + " Export CSV</button>" +
    "</div>" +

    '<div class="bar-track"><div class="bar-fill" style="width:' + pct(s.ticketsSold, goal) + '%"></div></div>' +

    '<details class="panel" open><summary>Add a single attendee <span>' + icon("chev") + '</span></summary><div class="panel-body">' +
      '<form id="add-attendee-form" class="form-grid">' +
        '<div class="field"><label>Name *</label><input name="name" required placeholder="Guest name"></div>' +
        '<div class="field"><label>Email</label><input name="email" type="email" placeholder="guest@email.com"></div>' +
        '<div class="field"><label>Tickets</label><input name="tickets" type="number" min="1" value="1"></div>' +
        '<div class="field"><label>Status</label><select name="status"><option value="invited">Invited</option><option value="attending">Attending</option><option value="paid">Paid</option><option value="comp">Complimentary</option></select></div>' +
        '<div class="field"><label>Notes</label><input name="notes" placeholder="Dietary needs, table, etc"></div>' +
        '<div class="field" style="justify-content:flex-end"><button type="submit" class="btn">' + icon("plus") + " Add attendee</button></div>" +
      "</form></div></details>" +

    '<details class="panel"><summary>Bulk add attendees <span>' + icon("chev") + '</span></summary><div class="panel-body">' +
      '<p class="muted" style="font-size:13px;margin:0 0 8px">Paste one guest per line. Each line can just be a name, or Name, Email, Tickets, Status (pasting straight from a spreadsheet also works).</p>' +
      '<textarea id="bulk-attendee-input" rows="6" placeholder="Jane Smith\nJane Smith, jane@email.com, 2, paid\nJohn and Priya Lee, , 2"></textarea>' +
      '<div style="margin-top:10px;display:flex;gap:8px"><button type="button" class="btn" data-action="bulk-add-attendees">' + icon("plus") + " Add all guests</button></div>" +
    "</div></details>" +

    '<div class="search-row">' +
      '<input type="search" id="attendee-search" placeholder="Search attendees" value="' + esc(ui.attendeeSearch) + '">' +
      '<select id="attendee-filter">' +
        '<option value="all"' + (ui.attendeeFilter === "all" ? " selected" : "") + ">All statuses</option>" +
        '<option value="invited"' + (ui.attendeeFilter === "invited" ? " selected" : "") + ">Invited</option>" +
        '<option value="attending"' + (ui.attendeeFilter === "attending" ? " selected" : "") + ">Attending</option>" +
        '<option value="paid"' + (ui.attendeeFilter === "paid" ? " selected" : "") + ">Paid</option>" +
        '<option value="comp"' + (ui.attendeeFilter === "comp" ? " selected" : "") + ">Complimentary</option>" +
      "</select>" +
    "</div>" +

    '<div class="table-wrap"><table class="data"><thead><tr>' +
      "<th>Name</th><th>Email</th><th>Tickets</th><th>Status</th><th>Amount</th><th>Notes</th><th></th>" +
    "</tr></thead><tbody>" + rows + "</tbody></table></div>" +
  "</div>";
}

function renderAttendeeRow(a) {
  return '<tr data-collection="attendees" data-id="' + a.id + '">' +
    '<td><input data-field="name" value="' + esc(a.name) + '"></td>' +
    '<td><input data-field="email" type="email" value="' + esc(a.email) + '"></td>' +
    '<td class="num"><input data-field="tickets" type="number" min="0" value="' + esc(a.tickets) + '" style="width:64px;text-align:right"></td>' +
    '<td><select data-field="status" class="status-select ' + esc(a.status) + '">' +
      Object.keys(ATTENDEE_STATUS_LABELS).map(function (k) { return '<option value="' + k + '"' + (a.status === k ? " selected" : "") + ">" + ATTENDEE_STATUS_LABELS[k] + "</option>"; }).join("") +
    "</select></td>" +
    '<td class="num"><input data-field="amountPaid" type="number" min="0" step="0.01" value="' + esc(a.amountPaid) + '" style="width:84px;text-align:right"></td>' +
    '<td><input data-field="notes" value="' + esc(a.notes) + '"></td>' +
    '<td><button type="button" class="icon-btn" data-action="remove" title="Remove attendee">' + icon("trash") + "</button></td>" +
  "</tr>";
}

/* ============================= render: donations ============================= */

function filteredDonations() {
  return STATE.donations.filter(function (d) { return ui.donationFilter === "all" || d.status === ui.donationFilter; });
}

function renderDonations() {
  var s = computeStats();
  var list = filteredDonations();
  var rows = list.map(renderDonationRow).join("");
  if (!list.length) {
    rows = '<tr><td colspan="8" class="empty-row">' + (STATE.donations.length ? "No donations match this filter." : "No prize donations logged yet. Use the ask playbook below, then track every business you contact here.") + "</td></tr>";
  }

  return '<div class="tab-panel">' +
    '<div class="section-head"><div><div class="eyebrow">Donations & prizes</div><h2>' + s.donationsConfirmedCount + " prizes secured, " + money(s.donationValueSecured) + ' in value</h2><p>Track every business you approach for a prize donation, from first ask through to thank you.</p></div></div>' +

    '<div class="card" style="background:linear-gradient(155deg,var(--rose-50),var(--surface))">' +
      '<h3 style="margin-bottom:4px">New to asking for prize donations? Start here</h3>' +
      '<p class="muted" style="font-size:13px;margin:0 0 14px">A simple strategy and a ready to send email template, so you can start reaching out today.</p>' +
      '<div class="two-col">' +
        '<div>' +
          '<div class="eyebrow" style="margin-bottom:8px">Who to approach</div>' +
          '<div class="tag-list">' + DONATION_TARGETS.map(function (t) { return '<span class="pill rose">' + esc(t) + "</span>"; }).join("") + "</div>" +
          '<div class="eyebrow" style="margin:16px 0 8px">How to ask</div>' +
          "<ul style=\"margin:0;padding-left:18px;font-size:13.5px;color:var(--ink-soft);display:flex;flex-direction:column;gap:6px\">" + DONATION_TIPS.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>" +
        "</div>" +
        '<div>' +
          '<div class="eyebrow" style="margin-bottom:8px">Copy and send email</div>' +
          '<div class="template-box" id="email-template-box">' + esc(EMAIL_TEMPLATE) + "</div>" +
          '<div style="margin-top:10px"><button type="button" class="btn subtle" data-action="copy-template">' + icon("copy") + " Copy template</button></div>" +
        "</div>" +
      "</div>" +
    "</div>" +

    '<details class="panel" open><summary>Log a donation or prize <span>' + icon("chev") + '</span></summary><div class="panel-body">' +
      '<form id="add-donation-form" class="form-grid">' +
        '<div class="field"><label>Business or donor *</label><input name="business" required placeholder="Business name"></div>' +
        '<div class="field"><label>Contact</label><input name="contact" placeholder="Contact person"></div>' +
        '<div class="field"><label>Item offered</label><input name="item" placeholder="What they are donating"></div>' +
        '<div class="field"><label>Estimated value ($)</label><input name="value" type="number" min="0" step="1" value="0"></div>' +
        '<div class="field"><label>Status</label><select name="status">' +
          Object.keys(DONATION_STATUS_LABELS).map(function (k) { return '<option value="' + k + '"' + (k === "to-contact" ? " selected" : "") + ">" + DONATION_STATUS_LABELS[k] + "</option>"; }).join("") +
        "</select></div>" +
        '<div class="field" style="justify-content:flex-end"><button type="submit" class="btn">' + icon("plus") + " Add to tracker</button></div>" +
      "</form></div></details>" +

    '<div class="search-row"><select id="donation-filter">' +
      '<option value="all"' + (ui.donationFilter === "all" ? " selected" : "") + ">All statuses</option>" +
      Object.keys(DONATION_STATUS_LABELS).map(function (k) { return '<option value="' + k + '"' + (ui.donationFilter === k ? " selected" : "") + ">" + DONATION_STATUS_LABELS[k] + "</option>"; }).join("") +
    "</select></div>" +

    '<div class="table-wrap"><table class="data"><thead><tr>' +
      "<th>Business or donor</th><th>Contact</th><th>Item</th><th>Value</th><th>Status</th><th>Thanked</th><th>Notes</th><th></th>" +
    "</tr></thead><tbody>" + rows + "</tbody></table></div>" +
  "</div>";
}

function renderDonationRow(d) {
  return '<tr data-collection="donations" data-id="' + d.id + '">' +
    '<td><input data-field="business" value="' + esc(d.business) + '"></td>' +
    '<td><input data-field="contact" value="' + esc(d.contact) + '"></td>' +
    '<td><input data-field="item" value="' + esc(d.item) + '"></td>' +
    '<td class="num"><input data-field="value" type="number" min="0" step="1" value="' + esc(d.value) + '" style="width:80px;text-align:right"></td>' +
    '<td><select data-field="status" class="status-select ' + esc(d.status) + '">' +
      Object.keys(DONATION_STATUS_LABELS).map(function (k) { return '<option value="' + k + '"' + (d.status === k ? " selected" : "") + ">" + DONATION_STATUS_LABELS[k] + "</option>"; }).join("") +
    "</select></td>" +
    '<td style="text-align:center"><input type="checkbox" class="task-check" data-field="thanked"' + (d.thanked ? " checked" : "") + "></td>" +
    '<td><input data-field="notes" value="' + esc(d.notes) + '"></td>' +
    '<td><button type="button" class="icon-btn" data-action="remove" title="Remove">' + icon("trash") + "</button></td>" +
  "</tr>";
}

/* ============================= render: activities ============================= */

function renderActivities() {
  var s = computeStats();
  var addedIds = STATE.activities.map(function (a) { return a.ideaId; }).filter(Boolean);
  var ideaCards = ACTIVITY_IDEAS.map(function (idea) {
    var added = addedIds.indexOf(idea.id) > -1;
    return '<div class="idea-card"><h4>' + esc(idea.name) + "</h4><p>" + esc(idea.tagline) + "</p>" +
      '<div class="idea-meta"><span class="pill neutral">Effort: ' + esc(idea.effort) + '</span><span class="pill gold">' + esc(idea.potential) + "</span></div>" +
      '<div class="idea-needs">Needs: ' + esc(idea.needs) + "</div>" +
      (added ? '<span class="pill success" style="margin-top:6px">Added to your plan</span>' : '<button type="button" class="btn sm" data-action="add-idea" data-idea="' + idea.id + '">' + icon("plus") + " Add to plan</button>") +
    "</div>";
  }).join("");

  var rows = STATE.activities.map(renderActivityRow).join("");
  if (!STATE.activities.length) {
    rows = '<tr><td colspan="7" class="empty-row">No activities planned yet. Add an idea above, or create your own below.</td></tr>';
  }

  return '<div class="tab-panel">' +
    '<div class="section-head"><div><div class="eyebrow">Fundraising activities</div><h2>' + money(s.activityRevenueActual) + " raised toward " + money(s.activityRevenueTarget) + ' targeted</h2><p>Racing day activity ideas tailored to Racing for a Cure. Add the ones you want to run, then plan the details.</p></div></div>' +

    '<div class="idea-grid">' + ideaCards + "</div>" +

    '<details class="panel" open><summary>Add a custom activity <span>' + icon("chev") + '</span></summary><div class="panel-body">' +
      '<form id="add-activity-form" class="form-grid">' +
        '<div class="field"><label>Activity name *</label><input name="name" required placeholder="e.g. Guess the jockey silks"></div>' +
        '<div class="field"><label>Time slot</label><input name="timeSlot" placeholder="e.g. Race 3, 2:30pm"></div>' +
        '<div class="field"><label>Owner</label><input name="owner" placeholder="Who is running it"></div>' +
        '<div class="field"><label>Target revenue ($)</label><input name="targetRevenue" type="number" min="0" step="1" value="0"></div>' +
        '<div class="field" style="justify-content:flex-end"><button type="submit" class="btn">' + icon("plus") + " Add activity</button></div>" +
      "</form></div></details>" +

    '<div class="table-wrap"><table class="data"><thead><tr>' +
      "<th>Activity</th><th>Time slot</th><th>Owner</th><th>Status</th><th>Target</th><th>Actual</th><th></th>" +
    "</tr></thead><tbody>" + rows + "</tbody></table></div>" +
  "</div>";
}

function renderActivityRow(a) {
  return '<tr data-collection="activities" data-id="' + a.id + '">' +
    '<td><input data-field="name" value="' + esc(a.name) + '"></td>' +
    '<td><input data-field="timeSlot" value="' + esc(a.timeSlot) + '"></td>' +
    '<td><input data-field="owner" value="' + esc(a.owner) + '"></td>' +
    '<td><select data-field="status" class="status-select ' + esc(a.status) + '">' +
      Object.keys(ACTIVITY_STATUS_LABELS).map(function (k) { return '<option value="' + k + '"' + (a.status === k ? " selected" : "") + ">" + ACTIVITY_STATUS_LABELS[k] + "</option>"; }).join("") +
    "</select></td>" +
    '<td class="num"><input data-field="targetRevenue" type="number" min="0" step="1" value="' + esc(a.targetRevenue) + '" style="width:80px;text-align:right"></td>' +
    '<td class="num"><input data-field="actualRevenue" type="number" min="0" step="1" value="' + esc(a.actualRevenue) + '" style="width:80px;text-align:right"></td>' +
    '<td><button type="button" class="icon-btn" data-action="remove" title="Remove">' + icon("trash") + "</button></td>" +
  "</tr>";
}

/* ============================= render: checklist ============================= */

function renderChecklist() {
  var s = computeStats();
  var pctAll = pct(s.checklistDone, s.checklistTotal);
  var blocks = CHECKLIST_CATEGORIES.map(function (cat) {
    var items = STATE.checklist.filter(function (c) { return c.category === cat; });
    var done = items.filter(function (c) { return c.status === "done"; }).length;
    var p = pct(done, items.length);
    var rows = items.map(renderChecklistRow).join("");
    return '<div class="cat-block">' +
      '<div class="cat-head"><h3>' + esc(cat) + '</h3><div class="cat-progress"><div class="bar-track"><div class="bar-fill" style="width:' + p + '%"></div></div><span class="muted" style="font-size:12.5px;white-space:nowrap">' + done + "/" + items.length + "</span></div></div>" +
      rows +
    "</div>";
  }).join("");

  return '<div class="tab-panel">' +
    '<div class="section-head"><div><div class="eyebrow">Event checklist</div><h2>' + pctAll + '% of the plan complete</h2><p>A starter checklist for a race day fundraiser, grouped by when it needs doing. Tick things off, assign an owner, or add your own tasks.</p></div></div>' +
    '<div class="bar-track"><div class="bar-fill success" style="width:' + pctAll + '%"></div></div>' +

    '<details class="panel"><summary>Add a task <span>' + icon("chev") + '</span></summary><div class="panel-body">' +
      '<form id="add-task-form" class="form-grid">' +
        '<div class="field"><label>Task *</label><input name="task" required placeholder="What needs to happen"></div>' +
        '<div class="field"><label>Category</label><select name="category">' + CHECKLIST_CATEGORIES.map(function (c) { return '<option value="' + esc(c) + '">' + esc(c) + "</option>"; }).join("") + "</select></div>" +
        '<div class="field"><label>Timing</label><input name="timing" placeholder="e.g. 4-6 weeks before"></div>' +
        '<div class="field"><label>Owner</label><input name="owner" placeholder="Who is doing it"></div>' +
        '<div class="field"><label>Date due</label><input name="dueDate" type="date"></div>' +
        '<div class="field" style="justify-content:flex-end"><button type="submit" class="btn">' + icon("plus") + " Add task</button></div>" +
      "</form></div></details>" +

    '<div style="display:flex;flex-direction:column;gap:14px">' + blocks + "</div>" +
  "</div>";
}

function renderChecklistRow(c) {
  return '<div class="task-row' + (c.status === "done" ? " done" : "") + '" data-collection="checklist" data-id="' + c.id + '">' +
    '<input type="checkbox" class="task-check" data-field="status-toggle"' + (c.status === "done" ? " checked" : "") + ' title="Mark done">' +
    '<input class="task-text" data-field="task" value="' + esc(c.task) + '">' +
    '<span class="pill neutral" style="white-space:nowrap">' + esc(c.timing || "") + "</span>" +
    '<input class="task-owner" data-field="owner" placeholder="Owner" value="' + esc(c.owner) + '">' +
    '<input type="date" class="task-due" data-field="dueDate" title="Date due" value="' + esc(c.dueDate) + '">' +
    '<select data-field="status" class="status-select ' + esc(c.status) + '">' +
      Object.keys(CHECKLIST_STATUS_LABELS).map(function (k) { return '<option value="' + k + '"' + (c.status === k ? " selected" : "") + ">" + CHECKLIST_STATUS_LABELS[k] + "</option>"; }).join("") +
    "</select>" +
    '<button type="button" class="icon-btn" data-action="remove" title="Remove task">' + icon("trash") + "</button>" +
  "</div>";
}

/* ============================= bulk parsing / csv ============================= */

function parseBulkAttendees(text) {
  var lines = text.split(/\r?\n/).map(function (l) { return l.trim(); }).filter(Boolean);
  var out = [];
  lines.forEach(function (line) {
    var parts = line.indexOf("\t") > -1 ? line.split("\t") : line.split(",");
    parts = parts.map(function (p) { return p.trim(); });
    var name = parts[0];
    if (!name) return;
    var email = parts[1] || "";
    var tickets = parseInt(parts[2], 10);
    if (!tickets || tickets < 1) tickets = 1;
    var statusRaw = (parts[3] || "").toLowerCase();
    var status = statusRaw === "paid" ? "paid" : (statusRaw === "comp" || statusRaw === "complimentary" ? "comp" : (statusRaw === "attending" ? "attending" : "invited"));
    out.push({
      name: name, email: email, tickets: tickets, status: status,
      amountPaid: status === "paid" ? tickets * (Number(STATE.settings.ticketPrice) || 0) : 0,
      notes: "", dateAdded: new Date().toISOString().slice(0, 10)
    });
  });
  return out;
}

function toCsv(rows) {
  function cell(v) {
    v = v === undefined || v === null ? "" : String(v);
    if (/[",\n]/.test(v)) v = '"' + v.replace(/"/g, '""') + '"';
    return v;
  }
  return rows.map(function (r) { return r.map(cell).join(","); }).join("\r\n");
}

function downloadFile(filename, text, mime) {
  var blob = new Blob([text], { type: mime || "text/plain;charset=utf-8" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
}

function exportAttendeesCsv() {
  var header = ["Name", "Email", "Tickets", "Status", "Amount paid", "Notes", "Date added"];
  var rows = STATE.attendees.map(function (a) {
    return [a.name, a.email, a.tickets, ATTENDEE_STATUS_LABELS[a.status] || a.status, a.amountPaid, a.notes, a.dateAdded];
  });
  downloadFile("racing-for-a-cure-attendees.csv", toCsv([header].concat(rows)), "text/csv;charset=utf-8");
  toast("Attendee list downloaded.");
}

function copyTemplate() {
  var text = EMAIL_TEMPLATE;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function () { toast("Template copied. Paste it into your email."); }).catch(function () { toast("Could not copy automatically, please select the text and copy it."); });
  } else {
    toast("Please select the template text and copy it manually.");
  }
}

/* ============================= event wiring ============================= */

function onRootClick(e) {
  var tabBtn = e.target.closest('[data-action="tab"]');
  if (tabBtn) { ui.tab = tabBtn.getAttribute("data-tab"); renderAll(); return; }

  var signOutBtn = e.target.closest('[data-action="sign-out"]');
  if (signOutBtn) { signOutNow(); return; }

  var removeBtn = e.target.closest('[data-action="remove"]');
  if (removeBtn) {
    var row = removeBtn.closest("[data-collection]");
    removeDoc(row.getAttribute("data-collection"), row.getAttribute("data-id"));
    return;
  }

  var removeAccessBtn = e.target.closest('[data-action="remove-access"]');
  if (removeAccessBtn) { removeApprovedEmail(removeAccessBtn.getAttribute("data-email")); return; }

  var bulkBtn = e.target.closest('[data-action="bulk-add-attendees"]');
  if (bulkBtn) {
    var ta = document.getElementById("bulk-attendee-input");
    var added = parseBulkAttendees(ta.value);
    if (!added.length) { toast("Paste at least one guest name first."); return; }
    var batch = db.batch();
    added.forEach(function (a) {
      var ref = col("attendees").doc();
      a.id = ref.id;
      batch.set(ref, a);
    });
    batch.commit().then(function () { toast("Added " + added.length + (added.length === 1 ? " guest." : " guests.")); })
      .catch(function (err) { toast("Could not add guests, please try again."); console.error(err); });
    return;
  }

  var ideaBtn = e.target.closest('[data-action="add-idea"]');
  if (ideaBtn) {
    var ideaId = ideaBtn.getAttribute("data-idea");
    var idea = ACTIVITY_IDEAS.filter(function (i) { return i.id === ideaId; })[0];
    if (!idea) return;
    addDoc("activities", { ideaId: idea.id, name: idea.name, timeSlot: "", owner: "", status: "planning", targetRevenue: 0, actualRevenue: 0, notes: idea.tagline });
    toast(idea.name + " added to your plan.");
    return;
  }

  if (e.target.closest('[data-action="copy-template"]')) { copyTemplate(); return; }
  if (e.target.closest('[data-action="export-csv"]')) { exportAttendeesCsv(); return; }
}

function onRootChange(e) {
  var t = e.target;

  if (t.id === "attendee-filter") { ui.attendeeFilter = t.value; renderAll(); return; }
  if (t.id === "donation-filter") { ui.donationFilter = t.value; renderAll(); return; }

  var settingsField = t.getAttribute("data-settings-field");
  if (settingsField) {
    var val = t.value;
    if (settingsField === "ticketPrice" || settingsField === "ticketGoal") val = Number(val) || 0;
    var patch = {};
    patch[settingsField] = val;
    updateSettings(patch);
    return;
  }

  var row = t.closest("[data-collection]");
  if (!row) return;
  var coll = row.getAttribute("data-collection");
  var id = row.getAttribute("data-id");
  var field = t.getAttribute("data-field");
  if (!field) return;

  var patch2 = {};
  if (field === "status-toggle") {
    patch2.status = t.checked ? "done" : "not-started";
  } else if (t.type === "checkbox") {
    patch2[field] = t.checked;
  } else if (t.type === "number") {
    patch2[field] = t.value === "" ? 0 : Number(t.value);
  } else {
    patch2[field] = t.value;
  }
  updateDoc(coll, id, patch2);
}

function onRootInput(e) {
  if (e.target.id === "attendee-search") {
    ui.attendeeSearch = e.target.value;
    renderAttendeesInPlace();
  }
}

function renderAttendeesInPlace() {
  var panel = document.querySelector(".tab-content");
  if (!panel || ui.tab !== "attendees") return;
  var caret = document.getElementById("attendee-search");
  var pos = caret ? caret.selectionStart : null;
  panel.innerHTML = renderTabPanel();
  var newInput = document.getElementById("attendee-search");
  if (newInput) { newInput.focus(); if (pos !== null) newInput.setSelectionRange(pos, pos); }
}

function onRootSubmit(e) {
  if (e.target.id === "add-attendee-form") {
    e.preventDefault();
    var f = e.target;
    var name = f.name.value.trim();
    if (!name) return;
    var tickets = Number(f.tickets.value) || 1;
    var status = f.status.value;
    addDoc("attendees", {
      name: name, email: f.email.value.trim(), tickets: tickets, status: status,
      amountPaid: status === "paid" ? tickets * (Number(STATE.settings.ticketPrice) || 0) : 0,
      notes: f.notes.value.trim(), dateAdded: new Date().toISOString().slice(0, 10)
    });
    toast(name + " added.");
    f.reset();
    return;
  }

  if (e.target.id === "add-donation-form") {
    e.preventDefault();
    var f2 = e.target;
    var business = f2.business.value.trim();
    if (!business) return;
    addDoc("donations", { business: business, contact: f2.contact.value.trim(), item: f2.item.value.trim(), value: Number(f2.value.value) || 0, status: f2.status.value, thanked: false, notes: "" });
    toast(business + " added to your donation tracker.");
    f2.reset();
    return;
  }

  if (e.target.id === "add-manual-fund-form") {
    e.preventDefault();
    var f6 = e.target;
    var source = f6.source.value.trim();
    if (!source) return;
    addDoc("manualFunds", { source: source, amount: Number(f6.amount.value) || 0, dateAdded: f6.dateAdded.value || new Date().toISOString().slice(0, 10), notes: f6.notes.value.trim() });
    toast(source + " added.");
    f6.reset();
    return;
  }

  if (e.target.id === "add-activity-form") {
    e.preventDefault();
    var f3 = e.target;
    var aname = f3.name.value.trim();
    if (!aname) return;
    addDoc("activities", { ideaId: null, name: aname, timeSlot: f3.timeSlot.value.trim(), owner: f3.owner.value.trim(), status: "planning", targetRevenue: Number(f3.targetRevenue.value) || 0, actualRevenue: 0, notes: "" });
    toast(aname + " added to your fundraising plan.");
    f3.reset();
    return;
  }

  if (e.target.id === "add-task-form") {
    e.preventDefault();
    var f4 = e.target;
    var task = f4.task.value.trim();
    if (!task) return;
    addDoc("checklist", { category: f4.category.value, task: task, timing: f4.timing.value.trim(), owner: f4.owner.value.trim(), dueDate: f4.dueDate.value, status: "not-started", notes: "" });
    toast("Task added.");
    f4.reset();
    return;
  }

  if (e.target.id === "add-access-form") {
    e.preventDefault();
    var f5 = e.target;
    addApprovedEmail(f5.email.value);
    f5.reset();
  }
}

/* ============================= init ============================= */

document.addEventListener("click", onRootClick);
document.addEventListener("change", onRootChange);
document.addEventListener("input", onRootInput);
document.addEventListener("submit", onRootSubmit);

})();
