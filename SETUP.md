# Riad Sidi — Setup Guide
> Follow these steps in order to get the website running

---

## Step 1 — Install Node.js
Download and install Node.js from https://nodejs.org (choose the LTS version)

---

## Step 2 — Install the project dependencies
Open a terminal, navigate to this folder, and run:
```bash
npm install
```
This downloads all the libraries the project needs (takes 1-2 minutes).

---

## Step 3 — Create your Sanity project
1. Go to https://sanity.io and create a free account
2. Click "Create new project"
3. Give it a name: "Riad Sidi"
4. Choose "Production" as the dataset name
5. Copy your **Project ID** (shown on the project page)

---

## Step 4 — Create your Resend account (for contact form emails)
1. Go to https://resend.com and create a free account
2. Go to API Keys → Create API Key
3. Copy the key (starts with `re_`)

---

## Step 5 — Set up environment variables
Copy the example file:
```bash
cp .env.example .env.local
```
Then open `.env.local` and fill in your values:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=   ← paste your Sanity project ID
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=                ← create a token in sanity.io/manage → API → Tokens
RESEND_API_KEY=                  ← paste your Resend key
CONTACT_EMAIL=info@riadsidi.com  ← your email address
SANITY_REVALIDATE_SECRET=riad-sidi-secret-2024  ← any random string
```

---

## Step 6 — Run the website locally
```bash
npm run dev
```
Open http://localhost:3000 in your browser.

---

## Step 7 — Access the admin panel
Go to http://localhost:3000/studio
Log in with your Sanity account.
Add your rooms, menu items, and photos here.

---

## Step 8 — Deploy to Vercel (go live)
1. Push the code to GitHub
2. Go to https://vercel.com and import the GitHub repository
3. In Vercel, go to Settings → Environment Variables and add all the same variables from your .env.local
4. Deploy — your site will be live at a Vercel URL

---

## Step 9 — Set up the Sanity webhook (live content updates)
1. Go to https://sanity.io/manage → your project → API → Webhooks
2. Click "Add Webhook"
3. URL: `https://your-vercel-domain.vercel.app/api/revalidate?secret=riad-sidi-secret-2024`
4. Trigger on: Create, Update, Delete
5. Save — now every time you save in the admin, the website updates automatically

---

## Step 10 — Connect your custom domain
1. Buy a domain (e.g. on Namecheap or GoDaddy)
2. In Vercel → Settings → Domains → Add your domain
3. Follow Vercel's instructions to point your domain's DNS to Vercel
