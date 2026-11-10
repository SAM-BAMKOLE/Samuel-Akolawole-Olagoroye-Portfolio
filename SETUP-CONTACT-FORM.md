# Contact form setup (about 10 minutes)

How it works: the visitor's browser posts to **your site's own server route** (`/api/contact`). That route validates the
message and forwards it to a **private Google Apps Script**, which adds a row to your Google Sheet and emails you.
The browser never touches Google or the sheet, and your script URL and secret never leave the server.

## 1. Create the sheet and script (signed in as olagoroyesamuelakolawole@gmail.com)

1. Create a new Google Sheet named **Portfolio Messages**.
2. In the sheet: **Extensions → Apps Script**.
3. Delete the starter code and paste in everything from `apps-script/Code.gs`. Save.
4. **Project Settings (gear icon) → Script properties → Add script property**
   - Property: `SECRET`
   - Value: a long random string. Generate one with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - Keep a copy; you need the same value in step 3.

## 2. Authorise and deploy

1. In the editor pick the **`setup`** function and click **Run**. Google asks for permission (Sheets + Gmail send).
   Click _Review permissions → your account → Advanced → Go to (project) → Allow_. The "unsafe" warning is normal for your own unpublished script.
   You should now have a `Messages` tab and a "setup OK" email in your inbox.
2. **Deploy → New deployment → ⚙ Web app**
   - Execute as: **Me**
   - Who has access: **Anyone** (the secret from step 1.4 is what protects it)
3. Click Deploy and **copy the Web app URL** (ends in `/exec`).

> If you edit `Code.gs` later: **Deploy → Manage deployments → ✏ → Version: New version → Deploy**. The URL stays the same.

## 3. Give the website the URL + secret

Local development: copy `.env.example` to `.env` and fill in both values.

Production (Vercel): **Project → Settings → Environment Variables**, add

- `APPS_SCRIPT_URL` = the `/exec` URL
- `APPS_SCRIPT_SECRET` = the same secret as the script property

Then redeploy. Never commit `.env` (it is in `.gitignore`).

## 4. Test

`npm run dev`, send a message from the contact section. You should get a new row in `Messages` and an email to
olagoroyesamuel7@gmail.com. Hit **Reply** in Gmail to answer the visitor directly (reply-to is set to their address).

## What's protecting it

- Browser → your server only; Google URL and secret are server-side env vars
- Secret checked inside the script; a wrong or missing secret is rejected
- Honeypot field + "submitted too fast" check + same-origin check + 3 messages per 10 min per IP
- Length limits and email validation on the server; sheet cells are neutralised against formula injection (`=`, `+`, `-`, `@`)
- Message bodies are HTML-escaped in the notification email

## Hosting note

The form needs a server runtime. The project is set up for **Vercel** (`@astrojs/vercel`). Netlify or Cloudflare work by
swapping the adapter in `astro.config.mjs`. Plain static hosts (GitHub Pages, S3 only) cannot run `/api/contact`.

## Limits and troubleshooting

- Free Gmail can send about 100 script emails a day; Apps Script has generous Sheet quotas. Fine for a portfolio.
- Form says "isn't configured yet": the env vars are missing on the server. Redeploy after adding them.
- "Couldn't send": open the Apps Script editor → **Executions** to see the error; check the secret matches exactly and access is "Anyone".
- No email but a row appears: run `setup` again to re-authorise, and check Spam.
- The in-memory rate limiter resets when the server instance restarts. It's a speed bump, not a hard wall.
