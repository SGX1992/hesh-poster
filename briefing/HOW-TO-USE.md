# HESH 2026 poster tool — how to use it

**https://hesh.fastforward.global**

A one-page tool that turns a visitor into a shareable "I am going" post for the
High End & Smart Home Show. Nothing to install, no login, no account. Someone
opens the link, spends about twenty seconds on it, and leaves with a
1080 × 1350 image ready for LinkedIn or Instagram.

---

## What a visitor does

1. **Picks who they are** — Attendee, Partner, Exhibitor or Speaker. Everyone
   except attendees gets that word printed above the headline on the poster.
2. **Picks a background** — Dubai, Silicon Oasis, the Vinyl Market, or one of
   three plain gradients. There are also three motion backgrounds if they want
   a video instead of a still.
3. **Adds a photo** — from their device or straight from the camera. They can
   zoom and reposition it.
4. **Types a name**, and optionally a role and company.
5. **Downloads** a PNG, or an MP4 / GIF in video mode.

That is the whole thing. There is no step that can fail, and nothing is stored:
the poster is drawn in the visitor's own browser and never reaches a server.

---

## How to send people to it

**The plain link.** `https://hesh.fastforward.global` — works everywhere.

**A link that pre-selects the role.** Add `?as=` and the role:

| audience | link |
|---|---|
| Exhibitors | `https://hesh.fastforward.global/?as=exhibitor` |
| Speakers | `https://hesh.fastforward.global/?as=speaker` |
| Partners | `https://hesh.fastforward.global/?as=partner` |

Send the exhibitor list the exhibitor link and they never have to think about
the picker. They can still change it.

**A link that fills in the name**, for a personalised mail merge:

```
https://hesh.fastforward.global/?as=speaker&name=Amelia%20Haddad&role=Head%20of%20Integration
```

Spaces become `%20`. `name` is the big line, `role` the smaller one under it.

**The QR code** (`hesh-qr.png`) points at the plain link. It is error-correction
level H, so it still scans with a logo placed over the middle or when printed
small — badges, signage, the back of a name card, a slide at the end of a talk.

---

## Where to put it

- In the registration confirmation email — the moment someone is most likely to
  post about coming.
- In the reminder mail the week before.
- On the exhibitor and speaker briefing sheets, with the matching `?as=` link.
- On a screen or a standee at the entrance, as the QR code.
- In the show's own LinkedIn post, so brands can reply with their poster.

---

## Hosting

It currently runs on **hesh.fastforward.global**, which needs nothing from the
client — no DNS change, no server.

If HESH would rather host it themselves, they can. It is a folder of static
files with no build step, no database and no server-side code. It will run on
anything that serves files: their existing web host, Netlify, Vercel, GitHub
Pages, an S3 bucket. Two things to do when moving it:

1. Point the new domain at the folder, and update `og:url` in `index.html` so
   link previews show the right address.
2. Delete `robots.txt` and the `noindex` meta if they want it findable in
   search — right now it is deliberately hidden so it does not compete with
   highendshow.ae.

The one thing that cannot move without them is **TT Firs Neue**: the font files
are licensed to HESH, which is exactly why they are fine to serve here. If this
tool is ever adapted for another brand, that licence does not travel with it.

---

## Files in this folder

| file | what it is |
|---|---|
| `hesh-briefing-banner.png` | 1600 × 900 banner for the briefing deck or an email |
| `hesh-qr.png` | 900 × 900 QR code to the tool, level H |
| `hesh-example-poster.png` | a finished poster at full size, as an example |

All three are generated from the live tool rather than mocked up, so they cannot
show something the tool does not actually produce.
