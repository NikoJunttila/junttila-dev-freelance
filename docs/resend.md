# Resend — contact form email delivery

The contact form on the homepage submits to a SvelteKit form action
(`src/routes/+page.server.ts`) which forwards the message to
`niko@junttila.dev` via the [Resend](https://resend.com) HTTP API.

This document covers what Resend is, what setup you need to do once, and
how to operate / debug it later.

---

## 1. What Resend is (30 seconds)

Resend is a transactional email provider — a service that accepts an API
call and sends an email on your behalf. Same category as SendGrid,
Postmark, Mailgun. You don't run an SMTP server, you don't manage IP
reputation, you just `POST` JSON and they handle delivery.

The free tier is **3,000 emails / month, 100 / day**. A solo freelance
contact form will never come close to that.

Pricing: free up to 3,000/mo, then $20/mo for 50k/mo. See
<https://resend.com/pricing>.

---

## 2. One-time setup

### 2.1 Create the account

1. Go to <https://resend.com> and sign up (Google login works).
2. Skip the team setup if it asks — you're a solo user.

### 2.2 Create an API key

1. In the Resend dashboard, open **API Keys** in the sidebar.
2. Click **Create API Key**.
3. Name: `junttila-dev-prod` (or whatever helps you recognize it later).
4. Permission: **Sending access** (default; you don't need Full access).
5. Domain: leave as "All domains" for now.
6. Copy the key. It starts with `re_…`. **You can't view it again** — if you
   lose it, generate a new one and rotate.

### 2.3 Put the key in `.env`

In the project root, create a `.env` file (it's git-ignored):

```sh
cp .env.example .env
```

Then open `.env` and paste the key:

```
RESEND_API_KEY=re_yourkeyhere
```

Restart the dev server so SvelteKit picks it up:

```sh
task dev
```

(env vars only load on boot — editing `.env` while the server is running
won't take effect until restart.)

### 2.4 Send a test message

Open the site, scroll to the contact form, fill it in, submit. You should
see the green "Kiitos viestistäsi" success card. Check your inbox at
`niko@junttila.dev` within a minute or so.

If it lands in spam, that's expected for now — see the **From address**
section below.

---

## 3. How the integration works

```
visitor ─── POST ──▶  SvelteKit form action  ─── POST ──▶  Resend API
                       (+page.server.ts)                  (api.resend.com/emails)
                                                                  │
                                                                  ▼
                                                       niko@junttila.dev inbox
```

The server reads the form, validates the fields, checks the honeypot, then
makes a single `fetch('https://api.resend.com/emails', …)` call with these
fields:

| Field      | Value                                              |
|------------|----------------------------------------------------|
| `from`     | `junttila.dev <onboarding@resend.dev>` (for now)   |
| `to`       | `niko@junttila.dev` (from `CONTACT.email`)         |
| `reply_to` | the visitor's email — so hitting Reply in your inbox replies to the sender, not to Resend |
| `subject`  | `junttila.dev — {visitor name}`                    |
| `text`     | the message body followed by `— {name} <{email}>`  |

If Resend responds with anything other than 2xx, the server logs the error
and the form shows the localized "Hups, viestin lähetys epäonnistui" /
"Hmm, that didn't go through" message.

### Validation rules

- All three fields (name, email, message) must be non-empty after trim.
- Email must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
- Hidden `website` honeypot field — if filled, the server returns a fake
  success and never calls Resend. Cheap defence against drive-by bots.

---

## 4. From-address & domain verification (recommended next step)

Right now the email's **From** header is
`junttila.dev <onboarding@resend.dev>`. That's Resend's open testing
sender — anyone can use it without setup, which is why it ships working on
day one. Two downsides:

- Mail clients often flag it as a generic shared sender, so messages may
  land in spam.
- The visible "from" address isn't yours, which looks unprofessional in
  the recipient's inbox.

To send from a real `…@junttila.dev` address you need to **verify the
domain** in Resend. Once that's done, change the `from:` line in
`src/routes/+page.server.ts` to your real address.

### 4.1 Verify junttila.dev in Resend

1. Resend dashboard → **Domains** → **Add Domain**.
2. Enter `junttila.dev`.
3. Resend shows you 3–4 DNS records to add (DKIM signing, an SPF entry,
   and usually a return-path / MX-ish record).
4. Open your DNS provider (whoever hosts `junttila.dev` — likely the same
   registrar or Cloudflare). Add each record exactly as shown. They look
   like:
   - `TXT  resend._domainkey  v=DKIM1; k=rsa; p=MIGfMA0…`
   - `TXT  send  v=spf1 include:amazonses.com ~all` (or similar)
   - `MX   send  feedback-smtp.eu-west-1.amazonses.com  10`
5. Click **Verify** in Resend. Propagation usually takes a few minutes
   but can take up to an hour. Once all rows show green, you're done.

### 4.2 Update the From address in the code

Edit `src/routes/+page.server.ts`:

```ts
// before
from: 'junttila.dev <onboarding@resend.dev>',
// after
from: 'Niko Junttila <niko@junttila.dev>',
```

Restart the dev server (or redeploy). New messages now appear from your
real address and pass DKIM/SPF, dropping spam-folder rates significantly.

---

## 5. Production deployment

`adapter-auto` will pick the right adapter when you deploy to Vercel,
Netlify, Cloudflare, etc. In each platform's dashboard you need to set the
`RESEND_API_KEY` env var (same value as in your local `.env`):

- **Vercel**: Project → Settings → Environment Variables.
- **Netlify**: Site → Build & deploy → Environment.
- **Cloudflare Pages**: Project → Settings → Environment variables.

Use the same key for staging and production until you outgrow that. If
you generate separate keys per environment, name them clearly in Resend's
dashboard.

---

## 6. Operations & debugging

### Where to watch sent emails

Resend dashboard → **Emails** shows every send for the last 90 days,
including the full request/response, the rendered email, opens, and
bounces. This is the first place to look when a message doesn't arrive.

### Common failure modes

| Symptom                                         | Cause / Fix                                                                                          |
|-------------------------------------------------|------------------------------------------------------------------------------------------------------|
| Form shows the error message immediately on submit | `RESEND_API_KEY` is missing or wrong. Check `.env`, restart `task dev`.                              |
| Submission succeeds but no email arrives        | Check the **Emails** tab in Resend. If status is `delivered`, look in spam. If `bounced`, the `to:` address is wrong. |
| Resend dashboard says "domain not verified"     | You changed `from:` to a `@junttila.dev` address before finishing DNS verification. Roll back to `onboarding@resend.dev` until verification is green. |
| Lots of spam form submissions                   | The honeypot stops simple bots but not all of them. Add a rate-limit (e.g. by IP via `event.getClientAddress()` and a small in-memory map) if it becomes a problem. |

### Rotating the API key

1. Generate a new key in Resend (don't delete the old one yet).
2. Update `.env` locally and the env var in your hosting provider.
3. Redeploy.
4. Verify a test submission works.
5. Delete the old key in Resend.

### Removing Resend

If you switch providers later, the only file with Resend-specific code is
`src/routes/+page.server.ts` — replace the `fetch` block with the new
provider's API call. The rest of the form (UI, validation, honeypot) is
provider-agnostic.

---

## 7. References

- Resend dashboard: <https://resend.com/dashboard>
- API reference (send endpoint): <https://resend.com/docs/api-reference/emails/send-email>
- Domain verification guide: <https://resend.com/docs/dashboard/domains/introduction>
- SvelteKit form actions: <https://svelte.dev/docs/kit/form-actions>
- SvelteKit env vars (`$env/dynamic/private`): <https://svelte.dev/docs/kit/$env-dynamic-private>
