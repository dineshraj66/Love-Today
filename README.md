# 💕 Love Today — PWA with Firebase Sync

A beautiful app to track your love story, memories, and special moments — synced across all your devices.

---

## 🔥 Step 1 — Set Up Firebase (One Time)

### 1.1 Create Firebase Project
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Add project"** → Name it `love-today` → Continue → Create project

### 1.2 Enable Authentication
1. In Firebase Console → **Build → Authentication**
2. Click **"Get started"**
3. Click **Email/Password** → Toggle **Enable** → Save
4. Go back to **Sign-in method** tab → Click **Google** → Toggle **Enable**
5. Set a **Project support email** (your Gmail) → Save

### 1.3 Create Firestore Database
1. In Firebase Console → **Build → Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in production mode"** → Select a region close to you → Done

### 1.4 Set Security Rules
1. In Firestore → **Rules** tab
2. Replace the rules with the contents of `firestore.rules` file:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
3. Click **Publish**

### 1.5 Get Your Firebase Config
1. In Firebase Console → **Project Settings** (gear icon ⚙️)
2. Scroll to **"Your apps"** → Click **Web** icon `</>`
3. Register app name: `love-today-web` → Continue
4. Copy the `firebaseConfig` object — it looks like:
```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "love-today-xxx.firebaseapp.com",
  projectId: "love-today-xxx",
  storageBucket: "love-today-xxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123:web:abc"
};
```

### 1.6 Paste Config Into index.html
1. Open `index.html` in any text editor
2. Find this section near the bottom (search for `YOUR_API_KEY`):
```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  ...
};
```
3. Replace it entirely with your copied config
4. Save the file

---

## 🚀 Step 2 — Deploy to GitHub Pages

### 2.1 Create GitHub Repository
1. Go to [github.com](https://github.com) → Sign in
2. Click **New repository** (+ icon)
3. Name: `love-today` | Visibility: **Public** | Create

### 2.2 Upload Files
1. On the repo page → click **"uploading an existing file"**
2. Upload ALL files:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `firestore.rules`
   - `icons/` folder (all icon files inside)
3. Click **Commit changes**

### 2.3 Enable GitHub Pages
1. Go to repo **Settings** → **Pages** (left sidebar)
2. Source: `Deploy from a branch` | Branch: `main` | Folder: `/ (root)`
3. Click **Save**
4. Wait ~2 minutes → live at **`https://YOUR-USERNAME.github.io/love-today`**

### 2.4 Add GitHub Pages Domain to Firebase
1. Firebase Console → **Authentication → Settings → Authorized domains**
2. Click **Add domain**
3. Enter: `YOUR-USERNAME.github.io`
4. Save

---

## 📱 Step 3 — Install on Phone

### Android (Chrome)
1. Open `https://YOUR-USERNAME.github.io/love-today` in Chrome
2. Tap **3-dot menu** → **"Add to Home Screen"**
3. Or wait for the automatic install banner

### iPhone (Safari)
1. Open the URL in **Safari** (must be Safari!)
2. Tap the **Share button** (box with arrow ↑)
3. Scroll down → **"Add to Home Screen"** → Add

---

## ✨ Features
- 🔐 **Login** — Email/password auth, your data is private
- ☁️ **Sync** — Real-time across all devices
- 🏠 **Home** — Today's memories
- 📖 **History** — All entries by month
- 💝 **Her Likes** — Things she loves + locations
- 🌟 **Future** — Plans & upcoming events
- 📊 **Stats** — Category charts & monthly activity
- ✦ **Categories** — Fully customizable
- 📴 **Offline** — Works without internet

---

## 💰 Cost
Firebase free tier (Spark plan) includes:
- 50,000 reads/day
- 20,000 writes/day
- 1 GB storage

More than enough for personal use — **completely free**.

