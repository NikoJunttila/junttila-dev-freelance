# Reply as `niko@junttila.dev` from Gmail (via Resend SMTP)

TLDR — Squarespace forwards inbound mail to Gmail, but replies go out as your Gmail address. To reply as your custom domain, point Gmail's "Send mail as" at Resend's SMTP.

## Prereqs

- `junttila.dev` verified in Resend (already done).
- For best deliverability, also verify the root `junttila.dev` in Resend — otherwise Gmail may show "via email.junttila.dev" to recipients.
- `RESEND_API_KEY` from your `.env`.

## Steps

- Gmail → ⚙ → **See all settings** → **Accounts and Import** → **Send mail as** → **Add another email address**.
- Name: `Niko Junttila` · Email: `niko@junttila.dev` · uncheck "Treat as alias" → **Next**.
- SMTP server: `smtp.resend.com`
- Port: `465`
- Username: `resend`
- Password: your `RESEND_API_KEY` (the `re_…` value)
- TLS: **SSL** → **Add Account**.
- Gmail sends a verification code to `niko@junttila.dev` → comes back through Squarespace forwarding → paste it.
- Back in **Send mail as**, click **make default** next to the new address (optional).
- Under "When replying to a message", pick **Reply from the same address the message was sent to** — so replies to `niko@junttila.dev` go out as that.

## Verify

- Compose a new mail in Gmail → From dropdown should now show `niko@junttila.dev`.
- Send to a third-party inbox (not your own Gmail — Gmail hides your own header issues). Check headers: `From:` should be `niko@junttila.dev`, no "via" tag once the root domain is verified.

## Limits

- Resend free tier: 100/day, 3,000/month. Replies easily fit.
- If you exceed: messages bounce back with an SMTP 4xx; either upgrade or fall back to plain Gmail for that day.
